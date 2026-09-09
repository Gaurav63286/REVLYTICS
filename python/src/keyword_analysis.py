"""
Keyword Analysis Module
Handles keyword extraction and clustering for customer reviews.
"""

import pandas as pd
import numpy as np
from collections import Counter
from typing import Dict, List, Tuple
import re
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class KeywordAnalyzer:
    """Analyzes keywords and clusters customer reviews by theme."""
    
    # Keyword cluster definitions with associated keywords
    KEYWORD_CLUSTERS = {
        'UI_RESPONSIVENESS': [
            'fast', 'slow', 'responsive', 'quick', 'speed', 'performance',
            'lag', 'delay', 'load', 'loading', 'instant', 'snappy', 'smooth'
        ],
        'UI_DESIGN': [
            'design', 'layout', 'interface', 'ui', 'look', 'appearance',
            'beautiful', 'ugly', 'modern', 'outdated', 'clean', 'cluttered'
        ],
        'NAVIGATION': [
            'navigate', 'navigation', 'find', 'search', 'menu', 'button',
            'link', 'easy to find', 'hard to find', 'confusing', 'intuitive'
        ],
        'CHECKOUT_LATENCY': [
            'checkout', 'cart', 'purchase', 'buy', 'order', 'payment',
            'long', 'takes too long', 'slow', 'timeout', 'freeze'
        ],
        'PAYMENT_FAILURE': [
            'payment', 'pay', 'transaction', 'charge', 'credit card',
            'fail', 'failed', 'error', 'declined', 'process', 'gateway'
        ],
        'CART_MANAGEMENT': [
            'cart', 'basket', 'add', 'remove', 'update', 'quantity',
            'items', 'products', 'save', 'restore'
        ],
        'SYSTEM_RELIABILITY': [
            'reliable', 'stable', 'uptime', 'available', 'consistent',
            'dependable', 'trust', 'solid', 'rock solid'
        ],
        'CRASH_ISSUES': [
            'crash', 'crashes', 'freeze', 'freezes', 'hang', 'hangs',
            'shutdown', 'restart', 'reboot', 'close', 'exit'
        ],
        'UPTIME': [
            'uptime', 'downtime', 'available', 'unavailable', 'down',
            'server', 'maintenance', 'outage'
        ],
        'MOBILE_PERFORMANCE': [
            'mobile', 'app', 'phone', 'tablet', 'ios', 'android',
            'responsive', 'touch', 'gesture', 'battery', 'data'
        ],
        'APP_CRASH': [
            'app crash', 'application crash', 'force close', 'stopped',
            'quit', 'exit unexpectedly'
        ],
        'MOBILE_UI': [
            'mobile ui', 'mobile interface', 'small screen', 'touch screen',
            'mobile design', 'responsive design'
        ],
        'CUSTOMER_SUPPORT': [
            'support', 'help', 'service', 'assistance', 'team', 'agent',
            'contact', 'reach', 'response'
        ],
        'RESPONSE_TIME': [
            'response time', 'reply', 'respond', 'quick response', 'slow response',
            'wait time', 'hold time', 'callback'
        ],
        'SUPPORT_QUALITY': [
            'helpful', 'friendly', 'knowledgeable', 'professional', 'rude',
            'unhelpful', 'incompetent', 'patient'
        ],
        'DELIVERY_DELAY': [
            'delivery', 'shipping', 'late', 'delay', 'delayed', 'on time',
            'fast delivery', 'slow delivery'
        ],
        'SHIPPING_QUALITY': [
            'package', 'packaging', 'damaged', 'broken', 'condition',
            'box', 'wrap', 'secure'
        ],
        'PACKAGING': [
            'packaging', 'box', 'wrap', 'secure', 'damaged', 'protection'
        ],
        'PRODUCT_QUALITY': [
            'quality', 'build', 'durable', 'sturdy', 'cheap', 'expensive',
            'materials', 'construction', 'well made', 'poor quality'
        ],
        'FEATURE_REQUESTS': [
            'feature', 'add', 'improve', 'enhancement', 'suggestion',
            'wish', 'would like', 'missing', 'need'
        ],
        'PRODUCT_BUGS': [
            'bug', 'issue', 'problem', 'defect', 'error', 'glitch',
            'malfunction', 'broken', 'not working'
        ],
        'LOGIN_ISSUES': [
            'login', 'log in', 'sign in', 'sign in', 'authentication',
            'access', 'enter', 'account'
        ],
        'AUTHENTICATION': [
            'authenticate', 'auth', 'verify', 'verification', 'security',
            'password', 'credential'
        ],
        'PASSWORD_RESET': [
            'password', 'reset', 'change password', 'forgot password',
            'new password', 'recover'
        ],
        'SEARCH_PERFORMANCE': [
            'search', 'find', 'look for', 'query', 'results', 'index',
            'fast search', 'slow search'
        ],
        'SEARCH_ACCURACY': [
            'accurate', 'relevant', 'results', 'wrong results', 'irrelevant',
            'precision', 'recall'
        ],
        'FILTER_ISSUES': [
            'filter', 'sort', 'refine', 'narrow', 'options', 'criteria',
            'parameters', 'filtering'
        ],
        'TRANSACTION_SPEED': [
            'transaction', 'speed', 'fast', 'slow', 'processing time',
            'instant', 'delay'
        ],
        'REFUND_ISSUES': [
            'refund', 'money back', 'return', 'credit', 'reimburse',
            'refund policy', 'refund process'
        ]
    }
    
    def __init__(self, data: pd.DataFrame):
        """
        Initialize the keyword analyzer.
        
        Args:
            data: DataFrame containing customer reviews
        """
        self.data = data.copy()
        self.cluster_stats = {}
    
    def analyze_keywords(self) -> pd.DataFrame:
        """
        Perform keyword analysis and clustering.
        
        Returns:
            DataFrame with added keyword cluster column
        """
        logger.info("Starting keyword analysis...")
        
        if 'review' not in self.data.columns:
            raise ValueError("DataFrame must contain 'review' column")
        
        # Assign keyword clusters based on review text
        self.data['detected_cluster'] = self.data['review'].apply(
            self._detect_cluster
        )
        
        # Calculate cluster statistics
        self._calculate_cluster_stats()
        
        logger.info("Keyword analysis complete")
        return self.data
    
    def _detect_cluster(self, text: str) -> str:
        """
        Detect the most relevant keyword cluster for a review.
        
        Args:
            text: Review text
            
        Returns:
            Keyword cluster name
        """
        if not isinstance(text, str) or not text.strip():
            return 'UNCATEGORIZED'
        
        text_lower = text.lower()
        cluster_scores = {}
        
        # Score each cluster based on keyword matches
        for cluster, keywords in self.KEYWORD_CLUSTERS.items():
            score = 0
            for keyword in keywords:
                # Count occurrences of keyword
                pattern = r'\b' + re.escape(keyword) + r'\b'
                matches = len(re.findall(pattern, text_lower))
                score += matches
            
            if score > 0:
                cluster_scores[cluster] = score
        
        # Return cluster with highest score, or UNCATEGORIZED if no matches
        if cluster_scores:
            return max(cluster_scores, key=cluster_scores.get)
        return 'UNCATEGORIZED'
    
    def _calculate_cluster_stats(self) -> None:
        """Calculate statistics for each keyword cluster."""
        cluster_counts = self.data['detected_cluster'].value_counts()
        total = len(self.data)
        
        self.cluster_stats = {
            'total_reviews': total,
            'cluster_counts': cluster_counts.to_dict(),
            'cluster_percentages': {
                cluster: round((count / total) * 100, 1)
                for cluster, count in cluster_counts.items()
            },
            'total_clusters': len(cluster_counts)
        }
    
    def get_cluster_stats(self) -> Dict:
        """
        Get keyword cluster statistics.
        
        Returns:
            Dictionary containing cluster statistics
        """
        return self.cluster_stats
    
    def get_top_keywords(self, n: int = 10) -> List[Tuple[str, int]]:
        """
        Get the most frequent keyword clusters.
        
        Args:
            n: Number of top clusters to return
            
        Returns:
            List of (cluster, count) tuples
        """
        if not self.cluster_stats:
            return []
        
        cluster_counts = self.cluster_stats['cluster_counts']
        sorted_clusters = sorted(
            cluster_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )
        return sorted_clusters[:n]
    
    def get_cluster_summary(self) -> str:
        """
        Get a formatted summary of keyword clusters.
        
        Returns:
            Formatted string with cluster information
        """
        top_clusters = self.get_top_keywords(5)
        summary_lines = ["Top Keyword Clusters:"]
        
        for cluster, count in top_clusters:
            percentage = self.cluster_stats['cluster_percentages'].get(cluster, 0)
            summary_lines.append(f"{cluster}: {count} reviews ({percentage}%)")
        
        return '\n'.join(summary_lines)
    
    def extract_keywords_from_text(self, text: str, top_n: int = 5) -> List[str]:
        """
        Extract top keywords from a single text.
        
        Args:
            text: Review text
            top_n: Number of top keywords to extract
            
        Returns:
            List of top keywords
        """
        if not isinstance(text, str) or not text.strip():
            return []
        
        text_lower = text.lower()
        words = re.findall(r'\b[a-z]{3,}\b', text_lower)
        
        # Filter out common stop words
        stop_words = {
            'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can',
            'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been',
            'this', 'that', 'with', 'they', 'from', 'what', 'when', 'which',
            'their', 'there', 'would', 'about', 'could', 'more', 'very',
            'into', 'than', 'just', 'some', 'such', 'your', 'only', 'will'
        }
        
        filtered_words = [w for w in words if w not in stop_words]
        word_counts = Counter(filtered_words)
        
        return [word for word, _ in word_counts.most_common(top_n)]


def analyze_keywords(data: pd.DataFrame) -> Tuple[pd.DataFrame, Dict]:
    """
    Convenience function to analyze keywords.
    
    Args:
        data: DataFrame containing reviews
        
    Returns:
        Tuple of (DataFrame with cluster column, cluster statistics)
    """
    analyzer = KeywordAnalyzer(data)
    analyzed_data = analyzer.analyze_keywords()
    stats = analyzer.get_cluster_stats()
    return analyzed_data, stats


if __name__ == "__main__":
    # Test the keyword analyzer
    test_reviews = pd.DataFrame({
        'review': [
            "The app is very slow and crashes constantly.",
            "Payment failed multiple times during checkout.",
            "The interface is beautiful and responsive.",
            "Customer support was very helpful and quick to respond.",
            "Delivery was delayed and package arrived damaged."
        ]
    })
    
    analyzer = KeywordAnalyzer(test_reviews)
    result = analyzer.analyze_keywords()
    
    print("Keyword Analysis Results:")
    print(result[['review', 'detected_cluster']])
    print("\nTop Clusters:")
    for cluster, count in analyzer.get_top_keywords():
        print(f"{cluster}: {count}")
