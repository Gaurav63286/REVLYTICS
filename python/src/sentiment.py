"""
Sentiment Analysis Module
Handles sentiment scoring and classification of customer reviews.
"""

import pandas as pd
import numpy as np
from typing import Dict, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SentimentAnalyzer:
    """Analyzes sentiment in customer reviews using a lightweight approach."""
    
    # Sentiment word lists (lightweight approach without external dependencies)
    POSITIVE_WORDS = {
        'excellent', 'great', 'awesome', 'fantastic', 'wonderful', 'amazing',
        'outstanding', 'perfect', 'love', 'best', 'brilliant', 'superb',
        'impressive', 'delighted', 'happy', 'pleased', 'satisfied', 'recommend',
        'smooth', 'fast', 'quick', 'responsive', 'intuitive', 'easy', 'clean',
        'beautiful', 'professional', 'helpful', 'friendly', 'reliable', 'stable',
        'secure', 'convenient', 'efficient', 'improved', 'better', 'good',
        'nice', 'enjoy', 'appreciate', 'thank', 'thanks', 'works', 'perfectly',
        'flawless', 'seamless', 'instant', 'instantly', 'rock', 'solid'
    }
    
    NEGATIVE_WORDS = {
        'terrible', 'awful', 'horrible', 'bad', 'worst', 'poor', 'disappointing',
        'disappointed', 'frustrating', 'frustrated', 'annoying', 'annoyed',
        'hate', 'dislike', 'unhappy', 'unsatisfied', 'dissatisfied', 'slow',
        'crash', 'crashes', 'broken', 'bug', 'bugs', 'glitch', 'glitches',
        'error', 'errors', 'fail', 'fails', 'failure', 'freeze', 'freezes',
        'unreliable', 'unstable', 'insecure', 'difficult', 'hard', 'confusing',
        'complicated', 'complex', 'useless', 'waste', 'terrible', 'awful',
        'horrible', 'never', 'always', 'impossible', 'cannot', "can't", 'won\'t',
        'doesn\'t', 'didn\'t', 'wouldn\'t', 'shouldn\'t', 'couldn\'t', 'issue',
        'issues', 'problem', 'problems', 'trouble', 'difficulties'
    }
    
    INTENSIFIERS = {
        'very': 1.5, 'really': 1.4, 'extremely': 1.6, 'absolutely': 1.7,
        'completely': 1.5, 'totally': 1.4, 'highly': 1.5, 'incredibly': 1.6,
        'exceptionally': 1.7, 'remarkably': 1.5, 'particularly': 1.3,
        'especially': 1.4, 'quite': 1.2, 'rather': 1.2, 'somewhat': 1.1,
        'slightly': 0.9, 'barely': 0.8, 'hardly': 0.8, 'scarcely': 0.8
    }
    
    NEGATORS = {
        'not', 'no', 'never', 'none', 'neither', 'nor', 'nothing', 'nobody',
        'nowhere', 'neither', 'hardly', 'barely', 'scarcely', 'rarely'
    }
    
    def __init__(self, data: pd.DataFrame):
        """
        Initialize the sentiment analyzer.
        
        Args:
            data: DataFrame containing customer reviews
        """
        self.data = data.copy()
        self.sentiment_stats = {}
    
    def analyze_sentiment(self) -> pd.DataFrame:
        """
        Perform sentiment analysis on all reviews.
        
        Returns:
            DataFrame with added sentiment columns
        """
        logger.info("Starting sentiment analysis...")
        
        if 'review' not in self.data.columns:
            raise ValueError("DataFrame must contain 'review' column")
        
        # Calculate sentiment scores
        self.data['calculated_sentiment_score'] = self.data['review'].apply(
            self._calculate_sentiment_score
        )
        
        # Classify sentiment based on score
        self.data['calculated_sentiment'] = self.data['calculated_sentiment_score'].apply(
            self._classify_sentiment
        )
        
        # Calculate statistics
        self._calculate_statistics()
        
        logger.info("Sentiment analysis complete")
        return self.data
    
    def _calculate_sentiment_score(self, text: str) -> float:
        """
        Calculate sentiment score for a single text.
        
        Args:
            text: Review text
            
        Returns:
            Sentiment score between 0 and 1
        """
        if not isinstance(text, str) or not text.strip():
            return 0.5  # Neutral for empty/invalid text
        
        words = text.lower().split()
        score = 0.5  # Start at neutral
        word_count = 0
        
        i = 0
        while i < len(words):
            word = words[i].strip('.,!?;:"\'')
            
            # Check for negation
            negated = False
            if i > 0 and words[i-1].strip('.,!?;:"\'') in self.NEGATORS:
                negated = True
            
            # Check for intensifier
            intensifier = 1.0
            if i > 0 and words[i-1].strip('.,!?;:"\'') in self.INTENSIFIERS:
                intensifier = self.INTENSIFIERS[words[i-1].strip('.,!?;:"\'')]
            
            # Calculate word contribution
            if word in self.POSITIVE_WORDS:
                contribution = 0.1 * intensifier
                if negated:
                    contribution *= -0.5
                score += contribution
                word_count += 1
            elif word in self.NEGATIVE_WORDS:
                contribution = -0.1 * intensifier
                if negated:
                    contribution *= -0.5
                score += contribution
                word_count += 1
            
            i += 1
        
        # Normalize score to [0, 1]
        score = max(0.0, min(1.0, score))
        
        return round(score, 2)
    
    def _classify_sentiment(self, score: float) -> str:
        """
        Classify sentiment based on score.
        
        Args:
            score: Sentiment score
            
        Returns:
            Sentiment label (Positive, Neutral, Negative)
        """
        if score >= 0.65:
            return 'POSITIVE'
        elif score <= 0.35:
            return 'NEGATIVE'
        else:
            return 'NEUTRAL'
    
    def _calculate_statistics(self) -> None:
        """Calculate sentiment statistics."""
        total = len(self.data)
        
        if total == 0:
            self.sentiment_stats = {}
            return
        
        positive_count = (self.data['calculated_sentiment'] == 'POSITIVE').sum()
        neutral_count = (self.data['calculated_sentiment'] == 'NEUTRAL').sum()
        negative_count = (self.data['calculated_sentiment'] == 'NEGATIVE').sum()
        
        avg_score = self.data['calculated_sentiment_score'].mean()
        
        self.sentiment_stats = {
            'total_reviews': total,
            'positive_count': int(positive_count),
            'neutral_count': int(neutral_count),
            'negative_count': int(negative_count),
            'positive_percentage': round((positive_count / total) * 100, 1),
            'neutral_percentage': round((neutral_count / total) * 100, 1),
            'negative_percentage': round((negative_count / total) * 100, 1),
            'average_sentiment_score': round(avg_score, 2)
        }
    
    def get_sentiment_stats(self) -> Dict:
        """
        Get sentiment analysis statistics.
        
        Returns:
            Dictionary containing sentiment statistics
        """
        return self.sentiment_stats
    
    def get_sentiment_summary(self) -> str:
        """
        Get a formatted summary of sentiment analysis.
        
        Returns:
            Formatted string with sentiment statistics
        """
        stats = self.sentiment_stats
        return (
            f"POSITIVE — {stats['positive_percentage']}%\n"
            f"NEUTRAL — {stats['neutral_percentage']}%\n"
            f"NEGATIVE — {stats['negative_percentage']}%\n"
            f"Average Sentiment Score: {stats['average_sentiment_score']}"
        )


def analyze_sentiment(data: pd.DataFrame) -> Tuple[pd.DataFrame, Dict]:
    """
    Convenience function to analyze sentiment.
    
    Args:
        data: DataFrame containing reviews
        
    Returns:
        Tuple of (DataFrame with sentiment columns, sentiment statistics)
    """
    analyzer = SentimentAnalyzer(data)
    analyzed_data = analyzer.analyze_sentiment()
    stats = analyzer.get_sentiment_stats()
    return analyzed_data, stats


if __name__ == "__main__":
    # Test the sentiment analyzer
    test_reviews = pd.DataFrame({
        'review': [
            "The application is excellent and works perfectly!",
            "I hate this product, it's terrible and slow.",
            "It's okay, nothing special but functional.",
            "Absolutely amazing experience, very satisfied!",
            "The worst experience ever, completely broken."
        ]
    })
    
    analyzer = SentimentAnalyzer(test_reviews)
    result = analyzer.analyze_sentiment()
    
    print("Sentiment Analysis Results:")
    print(result[['review', 'calculated_sentiment_score', 'calculated_sentiment']])
    print("\nStatistics:")
    print(analyzer.get_sentiment_summary())
