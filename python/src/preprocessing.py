"""
Preprocessing Module
Handles data cleaning, validation, and transformation of customer reviews.
"""

import pandas as pd
import numpy as np
import re
from typing import Dict, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DataPreprocessor:
    """Handles cleaning and preprocessing of customer review data."""
    
    def __init__(self, data: pd.DataFrame):
        """
        Initialize the preprocessor with raw data.
        
        Args:
            data: Raw DataFrame containing customer reviews
        """
        self.original_data = data.copy()
        self.processed_data = data.copy()
        self.cleaning_stats = {
            'original_records': len(data),
            'duplicates_removed': 0,
            'missing_values_handled': 0,
            'malformed_records_fixed': 0,
            'final_records': 0
        }
    
    def clean_data(self) -> pd.DataFrame:
        """
        Execute the complete cleaning pipeline.
        
        Returns:
            Cleaned DataFrame
        """
        logger.info("Starting data cleaning pipeline...")
        
        # Step 1: Remove duplicates
        self._remove_duplicates()
        
        # Step 2: Handle missing values
        self._handle_missing_values()
        
        # Step 3: Fix malformed records
        self._fix_malformed_records()
        
        # Step 4: Normalize text
        self._normalize_text()
        
        # Step 5: Validate and clean ratings
        self._validate_ratings()
        
        # Step 6: Validate and clean dates
        self._validate_dates()
        
        # Step 7: Remove noise
        self._remove_noise()
        
        self.cleaning_stats['final_records'] = len(self.processed_data)
        logger.info(f"Cleaning complete. Final records: {len(self.processed_data)}")
        
        return self.processed_data
    
    def _remove_duplicates(self) -> None:
        """Remove duplicate review records."""
        before_count = len(self.processed_data)
        
        # Remove exact duplicates based on review text
        self.processed_data = self.processed_data.drop_duplicates(
            subset=['review'], keep='first'
        )
        
        duplicates_removed = before_count - len(self.processed_data)
        self.cleaning_stats['duplicates_removed'] = duplicates_removed
        logger.info(f"Removed {duplicates_removed} duplicate records")
    
    def _handle_missing_values(self) -> None:
        """Handle missing values in the dataset."""
        missing_before = self.processed_data.isnull().sum().sum()
        
        # Handle missing review text - drop rows with empty reviews
        if 'review' in self.processed_data.columns:
            self.processed_data = self.processed_data[
                self.processed_data['review'].notna() & 
                (self.processed_data['review'].str.strip() != '')
            ]
        
        # Handle missing category - fill with 'Uncategorized'
        if 'category' in self.processed_data.columns:
            self.processed_data['category'] = self.processed_data['category'].fillna(
                'Uncategorized'
            )
        
        # Handle missing ratings - fill with median
        if 'rating' in self.processed_data.columns:
            median_rating = self.processed_data['rating'].median()
            self.processed_data['rating'] = self.processed_data['rating'].fillna(
                median_rating
            )
        
        missing_after = self.processed_data.isnull().sum().sum()
        values_handled = missing_before - missing_after
        self.cleaning_stats['missing_values_handled'] = values_handled
        logger.info(f"Handled {values_handled} missing values")
    
    def _fix_malformed_records(self) -> None:
        """Fix malformed records in the dataset."""
        fixed_count = 0
        
        # Fix rating values outside valid range (1-5)
        if 'rating' in self.processed_data.columns:
            invalid_mask = (self.processed_data['rating'] < 1) | \
                          (self.processed_data['rating'] > 5)
            fixed_count += invalid_mask.sum()
            self.processed_data.loc[invalid_mask, 'rating'] = \
                self.processed_data['rating'].clip(1, 5)
        
        # Fix extremely short reviews (likely noise)
        if 'review' in self.processed_data.columns:
            too_short = self.processed_data['review'].str.len() < 3
            fixed_count += too_short.sum()
            self.processed_data = self.processed_data[~too_short]
        
        self.cleaning_stats['malformed_records_fixed'] = fixed_count
        logger.info(f"Fixed {fixed_count} malformed records")
    
    def _normalize_text(self) -> None:
        """Normalize review text content."""
        if 'review' not in self.processed_data.columns:
            return
        
        # Normalize whitespace
        self.processed_data['review'] = self.processed_data['review'].str.replace(
            r'\s+', ' ', regex=True
        ).str.strip()
        
        # Create cleaned review column (lowercase for analysis)
        self.processed_data['cleaned_review'] = self.processed_data['review'].str.lower()
        
        logger.info("Text normalization complete")
    
    def _validate_ratings(self) -> None:
        """Validate rating values."""
        if 'rating' not in self.processed_data.columns:
            return
        
        # Ensure ratings are integers
        self.processed_data['rating'] = self.processed_data['rating'].astype(int)
        
        # Log any remaining invalid ratings
        invalid = self.processed_data[
            (self.processed_data['rating'] < 1) | 
            (self.processed_data['rating'] > 5)
        ]
        if not invalid.empty:
            logger.warning(f"Found {len(invalid)} invalid ratings after validation")
    
    def _validate_dates(self) -> None:
        """Validate and standardize date formats."""
        if 'date' not in self.processed_data.columns:
            return
        
        # Convert to datetime
        self.processed_data['date'] = pd.to_datetime(
            self.processed_data['date'], 
            errors='coerce'
        )
        
        # Remove records with invalid dates
        invalid_dates = self.processed_data['date'].isna()
        if invalid_dates.any():
            logger.warning(f"Removed {invalid_dates.sum()} records with invalid dates")
            self.processed_data = self.processed_data[~invalid_dates]
        
        # Format as string for consistency
        self.processed_data['date'] = self.processed_data['date'].dt.strftime('%Y-%m-%d')
    
    def _remove_noise(self) -> None:
        """Remove obvious noise from the dataset."""
        if 'review' not in self.processed_data.columns:
            return
        
        # Remove reviews that are just numbers or special characters
        noise_pattern = r'^[\d\W]+$'
        noise_mask = self.processed_data['review'].str.match(noise_pattern, na=False)
        
        if noise_mask.any():
            logger.info(f"Removed {noise_mask.sum()} noisy records")
            self.processed_data = self.processed_data[~noise_mask]
    
    def get_cleaning_stats(self) -> Dict:
        """
        Get statistics about the cleaning process.
        
        Returns:
            Dictionary containing cleaning statistics
        """
        return self.cleaning_stats
    
    def get_cleaning_summary(self) -> str:
        """
        Get a formatted summary of the cleaning process.
        
        Returns:
            Formatted string with cleaning statistics
        """
        stats = self.cleaning_stats
        return (
            f"Records received: {stats['original_records']}\n"
            f"Duplicates removed: {stats['duplicates_removed']}\n"
            f"Missing values handled: {stats['missing_values_handled']}\n"
            f"Malformed records fixed: {stats['malformed_records_fixed']}\n"
            f"Records processed: {stats['final_records']}\n"
            f"Cleaning status: COMPLETE"
        )


def preprocess_data(data: pd.DataFrame) -> Tuple[pd.DataFrame, Dict]:
    """
    Convenience function to preprocess data.
    
    Args:
        data: Raw DataFrame
        
    Returns:
        Tuple of (cleaned DataFrame, cleaning statistics)
    """
    preprocessor = DataPreprocessor(data)
    cleaned_data = preprocessor.clean_data()
    stats = preprocessor.get_cleaning_stats()
    return cleaned_data, stats


if __name__ == "__main__":
    # Test the preprocessor
    from data_loader import load_sample_data
    
    try:
        df = load_sample_data()
        print("Original data:")
        print(f"Records: {len(df)}")
        
        cleaned_df, stats = preprocess_data(df)
        
        print("\nCleaning Statistics:")
        for key, value in stats.items():
            print(f"{key}: {value}")
        
        print("\nCleaned data:")
        print(f"Records: {len(cleaned_df)}")
        print(cleaned_df.head())
        
    except Exception as e:
        print(f"Error: {e}")
