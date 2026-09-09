import { BarChart3, CheckCircle, ArrowRight, Database, Brain, BarChart2, Lightbulb } from 'lucide-react';

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 bg-card border-r border-gray-800 min-h-screen p-6 fixed left-0 top-0">
          <h1 className="text-xl font-bold text-text mb-2">📊 Review Analysis</h1>
          <p className="text-xs text-muted mb-6">v1.0.0</p>
          
          <nav className="space-y-2">
            <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted hover:bg-card-hover hover:text-text transition-colors">
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </a>
            <a href="/case-study" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/20 text-primary">
              <BarChart3 size={18} />
              <span>Case Study</span>
            </a>
          </nav>
        </aside>
        
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-text mb-4">Case Study</h1>
            <p className="text-xl text-muted mb-12">Building an end-to-end customer feedback analytics system</p>
            
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text mb-4">The Challenge</h2>
              <p className="text-muted leading-relaxed">
                Unstructured customer feedback across multiple touchpoints is noisy, inconsistent, and difficult to interpret at scale. 
                Organizations struggle to extract actionable insights from thousands of reviews, leading to missed opportunities for improvement.
              </p>
            </section>
            
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text mb-4">The Solution</h2>
              <p className="text-muted leading-relaxed mb-6">
                An end-to-end Python analytics pipeline that cleans customer feedback, identifies sentiment and recurring issues, 
                calculates business metrics, and presents results through an interactive Next.js dashboard.
              </p>
            </section>
            
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text mb-6">Architecture</h2>
              <div className="bg-card border border-gray-800 rounded-xl p-8">
                <div className="space-y-4">
                  {[
                    { icon: Database, label: 'CSV Data Ingestion' },
                    { icon: CheckCircle, label: 'Data Validation' },
                    { icon: CheckCircle, label: 'Preprocessing' },
                    { icon: Brain, label: 'Sentiment Engine' },
                    { icon: Lightbulb, label: 'Keyword Analysis' },
                    { icon: BarChart2, label: 'Analytics Engine' },
                    { icon: BarChart3, label: 'Next.js Dashboard' },
                    { icon: CheckCircle, label: 'Business Insights' },
                  ].map((item, index) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <item.icon className="text-primary" size={20} />
                      </div>
                      <span className="text-text font-medium">{item.label}</span>
                      {index < 7 && <ArrowRight className="text-muted mx-4" size={20} />}
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Automated Data Cleaning',
                    description: 'Handles duplicates, missing values, malformed records and inconsistent text.',
                  },
                  {
                    title: 'Sentiment Intelligence',
                    description: 'Classifies customer feedback into positive, neutral and negative sentiment.',
                  },
                  {
                    title: 'Pattern Detection',
                    description: 'Identifies recurring customer issues and keyword clusters.',
                  },
                  {
                    title: 'Interactive Analytics',
                    description: 'Provides real-time charts and filtering capabilities.',
                  },
                  {
                    title: 'High-Throughput Processing',
                    description: 'Uses Pandas and NumPy for efficient tabular processing.',
                  },
                  {
                    title: 'Portfolio-Ready Architecture',
                    description: 'Modular, maintainable and production-oriented code structure.',
                  },
                ].map((feature) => (
                  <div key={feature.title} className="bg-card border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Technology Stack</h2>
              <div className="bg-card border border-gray-800 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-primary font-semibold mb-2">Frontend</h4>
                    <ul className="text-muted space-y-1">
                      <li>Next.js 15</li>
                      <li>React 18</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Recharts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-secondary font-semibold mb-2">Backend</h4>
                    <ul className="text-muted space-y-1">
                      <li>Python</li>
                      <li>Pandas</li>
                      <li>NumPy</li>
                      <li>Vercel Serverless</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
