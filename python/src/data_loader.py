"""
Data Loader Module
Handles loading and validation of customer review data from CSV files.
"""

import pandas as pd
from pathlib import Path
from typing import Optional, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DataLoader:
    """Handles loading and validation of customer review datasets."""
    
    REQUIRED_COLUMNS = ['id', 'review', 'rating', 'date', 'category']
    
    def __init__(self, file_path: str):
        """
        Initialize the DataLoader.
        
        Args:
            file_path: Path to the CSV file containing customer reviews
        """
        self.file_path = Path(file_path)
        self.data: Optional[pd.DataFrame] = None
        self.validation_errors: list = []
        
    def load_data(self) -> pd.DataFrame:
        """
        Load data from CSV file with validation.
        
        Returns:
            DataFrame containing the loaded data
            
        Raises:
            FileNotFoundError: If the file doesn't exist
            ValueError: If the file format is invalid or columns are missing
        """
        if not self.file_path.exists():
            raise FileNotFoundError(f"Data file not found: {self.file_path}")
        
        try:
            self.data = pd.read_csv(self.file_path)
            logger.info(f"Loaded {len(self.data)} records from {self.file_path}")
            
            # Validate the data
            self._validate_data()
            
            if self.validation_errors:
                logger.warning(f"Validation errors found: {self.validation_errors}")
            
            return self.data
            
        except pd.errors.EmptyDataError:
            raise ValueError("The CSV file is empty")
        except pd.errors.ParserError:
            raise ValueError("Invalid CSV format")
        except Exception as e:
            raise ValueError(f"Error loading data: {str(e)}")
    
    def _validate_data(self) -> bool:
        """
        Validate the loaded data structure and content.
        
        Returns:
            True if validation passes, False otherwise
        """
        self.validation_errors = []
        
        # Check if data is empty
        if self.data is None or self.data.empty:
            self.validation_errors.append("Dataset is empty")
            return False
        
        # Check for required columns
        missing_columns = [col for col in self.REQUIRED_COLUMNS 
                          if col not in self.data.columns]
        if missing_columns:
            self.validation_errors.append(
                f"Missing required columns: {missing_columns}"
            )
        
        # Validate data types
        if 'rating' in self.data.columns:
            if not pd.api.types.is_numeric_dtype(self.data['rating']):
                self.validation_errors.append("Rating column must be numeric")
        
        if 'date' in self.data.columns:
            try:
                pd.to_datetime(self.data['date'], errors='coerce')
            except Exception:
                self.validation_errors.append("Date column contains invalid dates")
        
        # Check for completely empty rows
        empty_rows = self.data[self.data[self.REQUIRED_COLUMNS].isnull().all(axis=1)]
        if not empty_rows.empty:
            self.validation_errors.append(
                f"Found {len(empty_rows)} completely empty rows"
            )
        
        return len(self.validation_errors) == 0
    
    def get_data_info(self) -> dict:
        """
        Get information about the loaded dataset.
        
        Returns:
            Dictionary containing dataset metadata
        """
        if self.data is None:
            return {"error": "No data loaded"}
        
        return {
            "total_records": len(self.data),
            "columns": list(self.data.columns),
            "column_types": {col: str(dtype) for col, dtype in self.data.dtypes.items()},
            "memory_usage": self.data.memory_usage(deep=True).sum(),
            "has_nulls": self.data.isnull().any().to_dict(),
            "validation_errors": self.validation_errors
        }
    
    def preview_data(self, n: int = 5) -> pd.DataFrame:
        """
        Get a preview of the data.
        
        Args:
            n: Number of rows to preview
            
        Returns:
            DataFrame containing the first n rows
        """
        if self.data is None:
            raise ValueError("No data loaded")
        
        return self.data.head(n)


def load_sample_data() -> pd.DataFrame:
    """
    Load the sample customer reviews dataset.
    
    Returns:
        DataFrame containing the sample data
    """
    sample_path = Path(__file__).parent.parent / "data" / "customer_reviews.csv"
    loader = DataLoader(sample_path)
    return loader.load_data()


def load_uploaded_data(uploaded_file) -> pd.DataFrame:
    """
    Load data from an uploaded Streamlit file.
    
    Args:
        uploaded_file: Streamlit uploaded file object
        
    Returns:
        DataFrame containing the uploaded data
    """
    try:
        data = pd.read_csv(uploaded_file)
        logger.info(f"Loaded {len(data)} records from uploaded file")
        return data
    except Exception as e:
        raise ValueError(f"Error loading uploaded file: {str(e)}")


if __name__ == "__main__":
    # Test the data loader
    try:
        df = load_sample_data()
        print("Data loaded successfully!")
        print(f"Total records: {len(df)}")
        print(f"Columns: {list(df.columns)}")
        print("\nPreview:")
        print(df.head())
    except Exception as e:
        print(f"Error: {e}")
