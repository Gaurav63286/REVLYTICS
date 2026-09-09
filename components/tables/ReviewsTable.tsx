'use client';

import { useState } from 'react';

interface Review {
  id: string | number;
  review: string;
  category?: string;
  product?: string;
  rating?: number;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  score?: number;
  sentimentScore?: number;
  keyword_cluster?: string;
  date?: string;
}

export function ReviewsTable({ data }: { data: Review[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': return 'bg-positive/20 text-positive';
      case 'NEUTRAL': return 'bg-neutral/20 text-neutral';
      case 'NEGATIVE': return 'bg-negative/20 text-negative';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-4 text-muted font-medium">ID</th>
              <th className="text-left p-4 text-muted font-medium">Review</th>
              <th className="text-left p-4 text-muted font-medium">Category</th>
              <th className="text-left p-4 text-muted font-medium">Product</th>
              <th className="text-left p-4 text-muted font-medium">Rating</th>
              <th className="text-left p-4 text-muted font-medium">Sentiment</th>
              <th className="text-left p-4 text-muted font-medium">Score</th>
              <th className="text-left p-4 text-muted font-medium">Cluster</th>
              <th className="text-left p-4 text-muted font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((review, index) => (
              <tr key={`${review.id || index}-${index}`} className="border-b border-gray-800 hover:bg-card-hover">
                <td className="p-4 text-text">{review.id}</td>
                <td className="p-4 text-text max-w-xs truncate">{review.review}</td>
                <td className="p-4 text-text">{review.category}</td>
                <td className="p-4 text-text">{review.product}</td>
                <td className="p-4 text-text">{review.rating}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(review.sentiment)}`}>
                    {review.sentiment}
                  </span>
                </td>
                <td className="p-4 text-text">{review.score ? review.score.toFixed(2) : (review.sentimentScore || 0).toFixed(2)}</td>
                <td className="p-4 text-text">{review.keyword_cluster}</td>
                <td className="p-4 text-text">{review.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-muted text-sm">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-card border border-gray-800 rounded-lg text-text hover:bg-card-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-card border border-gray-800 rounded-lg text-text hover:bg-card-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
