"""
Visualization Module
Creates Matplotlib charts for customer review analytics.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from typing import Dict, List, Optional
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Set up matplotlib style for dark theme
plt.style.use('dark_background')


class Visualizer:
    """Creates visualizations for customer review analytics."""
    
    # Color palette for dark theme
    COLORS = {
        'background': '#0B1220',
        'card': '#111827',
        'primary': '#2563EB',
        'secondary': '#06B6D4',
        'text': '#F8FAFC',
        'muted': '#94A3B8',
        'positive': '#10B981',
        'neutral': '#F59E0B',
        'negative': '#EF4444'
    }
    
    def __init__(self, data: pd.DataFrame, output_dir: str = 'outputs/charts'):
        """
        Initialize the visualizer.
        
        Args:
            data: Processed DataFrame containing customer reviews
            output_dir: Directory to save chart images
        """
        self.data = data.copy()
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
    
    def create_all_charts(self, analytics: Dict) -> Dict[str, plt.Figure]:
        """
        Create all required charts.
        
        Args:
            analytics: Dictionary containing analytics data
            
        Returns:
            Dictionary mapping chart names to Figure objects
        """
        logger.info("Creating visualizations...")
        
        charts = {
            'sentiment_distribution': self.create_sentiment_distribution(analytics),
            'rating_distribution': self.create_rating_distribution(analytics),
            'top_keyword_clusters': self.create_top_keyword_clusters(analytics),
            'sentiment_by_category': self.create_sentiment_by_category(analytics),
            'sentiment_trend': self.create_sentiment_trend(analytics),
            'reviews_by_category': self.create_reviews_by_category(analytics),
            'avg_sentiment_by_product': self.create_avg_sentiment_by_product(analytics)
        }
        
        logger.info("All visualizations created")
        return charts
    
    def create_sentiment_distribution(self, analytics: Dict) -> plt.Figure:
        """Create sentiment distribution pie chart."""
        sentiment_data = analytics.get('sentiment', {})
        
        labels = ['Positive', 'Neutral', 'Negative']
        sizes = [
            sentiment_data.get('positive_percentage', 0),
            sentiment_data.get('neutral_percentage', 0),
            sentiment_data.get('negative_percentage', 0)
        ]
        colors = [self.COLORS['positive'], self.COLORS['neutral'], self.COLORS['negative']]
        
        fig, ax = plt.subplots(figsize=(10, 6))
        wedges, texts, autotexts = ax.pie(
            sizes, labels=labels, colors=colors, autopct='%1.1f%%',
            startangle=90, textprops={'color': self.COLORS['text']}
        )
        
        for autotext in autotexts:
            autotext.set_color(self.COLORS['background'])
            autotext.set_fontweight('bold')
        
        ax.set_title('Sentiment Distribution', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        plt.tight_layout()
        return fig
    
    def create_rating_distribution(self, analytics: Dict) -> plt.Figure:
        """Create rating distribution bar chart."""
        rating_data = analytics.get('ratings', {}).get('rating_distribution', {})
        
        ratings = list(rating_data.keys())
        counts = list(rating_data.values())
        
        fig, ax = plt.subplots(figsize=(10, 6))
        bars = ax.bar(ratings, counts, color=self.COLORS['primary'], alpha=0.8)
        
        ax.set_xlabel('Rating', color=self.COLORS['text'], fontsize=12)
        ax.set_ylabel('Number of Reviews', color=self.COLORS['text'], fontsize=12)
        ax.set_title('Rating Distribution', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        ax.tick_params(axis='x', colors=self.COLORS['muted'])
        ax.tick_params(axis='y', colors=self.COLORS['muted'])
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{int(height)}',
                   ha='center', va='bottom', color=self.COLORS['text'])
        
        ax.grid(axis='y', alpha=0.3, color=self.COLORS['muted'])
        plt.tight_layout()
        return fig
    
    def create_top_keyword_clusters(self, analytics: Dict) -> plt.Figure:
        """Create top keyword clusters horizontal bar chart."""
        keyword_data = analytics.get('keywords', {}).get('top_clusters', {})
        
        clusters = list(keyword_data.keys())[:10]
        counts = list(keyword_data.values())[:10]
        
        fig, ax = plt.subplots(figsize=(12, 8))
        bars = ax.barh(range(len(clusters)), counts, color=self.COLORS['secondary'], alpha=0.8)
        
        ax.set_yticks(range(len(clusters)))
        ax.set_yticklabels(clusters, color=self.COLORS['text'])
        ax.set_xlabel('Number of Reviews', color=self.COLORS['text'], fontsize=12)
        ax.set_title('Top 10 Keyword Clusters', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        ax.tick_params(axis='x', colors=self.COLORS['muted'])
        ax.invert_yaxis()
        
        # Add value labels
        for i, bar in enumerate(bars):
            width = bar.get_width()
            ax.text(width, bar.get_y() + bar.get_height()/2,
                   f'{int(width)}',
                   ha='left', va='center', color=self.COLORS['text'])
        
        ax.grid(axis='x', alpha=0.3, color=self.COLORS['muted'])
        plt.tight_layout()
        return fig
    
    def create_sentiment_by_category(self, analytics: Dict) -> plt.Figure:
        """Create sentiment by category stacked bar chart."""
        category_data = analytics.get('categories', {}).get('sentiment_by_category', {})
        
        categories = list(category_data.keys())[:10]
        positive = [category_data[cat]['positive'] for cat in categories]
        neutral = [category_data[cat]['neutral'] for cat in categories]
        negative = [category_data[cat]['negative'] for cat in categories]
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        x = np.arange(len(categories))
        width = 0.6
        
        ax.bar(x, positive, width, label='Positive', color=self.COLORS['positive'], alpha=0.8)
        ax.bar(x, neutral, width, bottom=positive, label='Neutral', color=self.COLORS['neutral'], alpha=0.8)
        ax.bar(x, negative, width, bottom=np.array(positive) + np.array(neutral), 
              label='Negative', color=self.COLORS['negative'], alpha=0.8)
        
        ax.set_xlabel('Category', color=self.COLORS['text'], fontsize=12)
        ax.set_ylabel('Number of Reviews', color=self.COLORS['text'], fontsize=12)
        ax.set_title('Sentiment Distribution by Category', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        ax.set_xticks(x)
        ax.set_xticklabels(categories, rotation=45, ha='right', color=self.COLORS['text'])
        ax.tick_params(axis='y', colors=self.COLORS['muted'])
        
        ax.legend(loc='upper right', facecolor=self.COLORS['card'], 
                 edgecolor=self.COLORS['muted'], labelcolor=self.COLORS['text'])
        
        ax.grid(axis='y', alpha=0.3, color=self.COLORS['muted'])
        plt.tight_layout()
        return fig
    
    def create_sentiment_trend(self, analytics: Dict) -> plt.Figure:
        """Create sentiment trend over time line chart."""
        temporal_data = analytics.get('temporal', {}).get('reviews_by_month', {})
        
        if not temporal_data:
            # Create empty chart if no temporal data
            fig, ax = plt.subplots(figsize=(12, 6))
            ax.text(0.5, 0.5, 'No temporal data available', 
                   ha='center', va='center', color=self.COLORS['muted'],
                   transform=ax.transAxes, fontsize=14)
            ax.set_title('Sentiment Trend Over Time', 
                        color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
            return fig
        
        months = list(temporal_data.keys())
        counts = list(temporal_data.values())
        
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.plot(range(len(months)), counts, marker='o', 
                color=self.COLORS['primary'], linewidth=2, markersize=8)
        
        ax.set_xlabel('Month', color=self.COLORS['text'], fontsize=12)
        ax.set_ylabel('Number of Reviews', color=self.COLORS['text'], fontsize=12)
        ax.set_title('Review Volume Trend Over Time', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        ax.set_xticks(range(len(months)))
        ax.set_xticklabels(months, rotation=45, ha='right', color=self.COLORS['text'])
        ax.tick_params(axis='y', colors=self.COLORS['muted'])
        
        ax.grid(alpha=0.3, color=self.COLORS['muted'])
        plt.tight_layout()
        return fig
    
    def create_reviews_by_category(self, analytics: Dict) -> plt.Figure:
        """Create reviews by category bar chart."""
        category_data = analytics.get('categories', {}).get('category_counts', {})
        
        categories = list(category_data.keys())[:10]
        counts = list(category_data.values())[:10]
        
        fig, ax = plt.subplots(figsize=(12, 6))
        bars = ax.bar(categories, counts, color=self.COLORS['primary'], alpha=0.8)
        
        ax.set_xlabel('Category', color=self.COLORS['text'], fontsize=12)
        ax.set_ylabel('Number of Reviews', color=self.COLORS['text'], fontsize=12)
        ax.set_title('Reviews by Category', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        ax.set_xticklabels(categories, rotation=45, ha='right', color=self.COLORS['text'])
        ax.tick_params(axis='y', colors=self.COLORS['muted'])
        
        # Add value labels
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{int(height)}',
                   ha='center', va='bottom', color=self.COLORS['text'])
        
        ax.grid(axis='y', alpha=0.3, color=self.COLORS['muted'])
        plt.tight_layout()
        return fig
    
    def create_avg_sentiment_by_product(self, analytics: Dict) -> plt.Figure:
        """Create average sentiment by product horizontal bar chart."""
        product_data = analytics.get('products', {}).get('average_rating_by_product', {})
        
        if not product_data:
            # Create empty chart if no product data
            fig, ax = plt.subplots(figsize=(10, 6))
            ax.text(0.5, 0.5, 'No product data available', 
                   ha='center', va='center', color=self.COLORS['muted'],
                   transform=ax.transAxes, fontsize=14)
            ax.set_title('Average Rating by Product', 
                        color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
            return fig
        
        products = list(product_data.keys())
        ratings = list(product_data.values())
        
        fig, ax = plt.subplots(figsize=(10, 6))
        bars = ax.barh(range(len(products)), ratings, color=self.COLORS['secondary'], alpha=0.8)
        
        ax.set_yticks(range(len(products)))
        ax.set_yticklabels(products, color=self.COLORS['text'])
        ax.set_xlabel('Average Rating', color=self.COLORS['text'], fontsize=12)
        ax.set_title('Average Rating by Product', 
                    color=self.COLORS['text'], fontsize=16, fontweight='bold', pad=20)
        
        ax.tick_params(axis='x', colors=self.COLORS['muted'])
        ax.set_xlim(0, 5)
        
        # Add value labels
        for i, bar in enumerate(bars):
            width = bar.get_width()
            ax.text(width, bar.get_y() + bar.get_height()/2,
                   f'{width:.1f}',
                   ha='left', va='center', color=self.COLORS['text'])
        
        ax.grid(axis='x', alpha=0.3, color=self.COLORS['muted'])
        plt.tight_layout()
        return fig
    
    def save_chart(self, fig: plt.Figure, filename: str) -> str:
        """
        Save a chart to file.
        
        Args:
            fig: Matplotlib Figure object
            filename: Name of the file to save
            
        Returns:
            Path to the saved file
        """
        filepath = self.output_dir / filename
        fig.savefig(filepath, dpi=150, bbox_inches='tight', 
                   facecolor=self.COLORS['background'], edgecolor='none')
        plt.close(fig)
        logger.info(f"Saved chart to {filepath}")
        return str(filepath)


def create_visualizations(data: pd.DataFrame, analytics: Dict, 
                         output_dir: str = 'outputs/charts') -> Dict[str, plt.Figure]:
    """
    Convenience function to create all visualizations.
    
    Args:
        data: Processed DataFrame
        analytics: Analytics dictionary
        output_dir: Directory to save charts
        
    Returns:
        Dictionary of chart figures
    """
    visualizer = Visualizer(data, output_dir)
    return visualizer.create_all_charts(analytics)


if __name__ == "__main__":
    # Test the visualizer
    from data_loader import load_sample_data
    from preprocessing import preprocess_data
    from sentiment import analyze_sentiment
    from keyword_analysis import analyze_keywords
    from analytics import calculate_analytics
    
    try:
        df = load_sample_data()
        cleaned_df, _ = preprocess_data(df)
        sentiment_df, _ = analyze_sentiment(cleaned_df)
        final_df, _ = analyze_keywords(sentiment_df)
        analytics = calculate_analytics(final_df)
        
        visualizer = Visualizer(final_df)
        charts = visualizer.create_all_charts(analytics)
        
        print("Charts created successfully!")
        for name, fig in charts.items():
            visualizer.save_chart(fig, f"{name}.png")
            print(f"Saved: {name}")
            
    except Exception as e:
        print(f"Error: {e}")
