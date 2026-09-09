# Customer Review Analysis System

**Python & Data Analytics // Pandas × NumPy**

A production-quality, portfolio-ready customer feedback analytics application built with Next.js, TypeScript, and Python analytics.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](https://revlytics-chi.vercel.app/)

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run start
```

## 📁 Project Structure

```
customer-review-analysis/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard home
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility functions
├── api/                   # Vercel serverless functions
├── python/                # Python analytics modules
│   ├── preprocessing.py
│   ├── sentiment.py
│   ├── keyword_analysis.py
│   └── analytics.py
├── data/                  # Sample dataset
└── public/               # Static assets
```

## 🎨 Features

- **Premium Dark UI** - Modern analytics dashboard design
- **KPI Cards** - Real-time metrics with trend indicators
- **Sentiment Analysis** - Automated customer feedback classification
- **Interactive Charts** - Recharts-powered visualizations
- **Data Upload** - CSV upload with validation
- **Export Features** - Download processed data and reports
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Python, Pandas, NumPy
- **Deployment**: Vercel

## 📊 Analytics Pipeline

1. **Data Ingestion** - Load CSV data
2. **Data Validation** - Check required columns
3. **Data Cleaning** - Remove duplicates, handle missing values
4. **Text Normalization** - Clean and standardize text
5. **Sentiment Analysis** - Classify feedback sentiment
6. **Keyword Detection** - Identify recurring issues
7. **Statistical Analysis** - Calculate business metrics
8. **Visualization** - Generate interactive charts

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Import repository into Vercel
3. Vercel will auto-detect Next.js configuration
4. Click Deploy

## 📝 License

MIT License - feel free to use for portfolio and educational purposes.
