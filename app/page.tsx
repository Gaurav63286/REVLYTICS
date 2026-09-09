import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle, Zap, Shield, Download, TrendingUp, Database, Brain, FileText, Github, Menu, X, ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'REVLYTICS — Customer Feedback Intelligence',
  description: 'Transform customer reviews into sentiment intelligence, recurring issue patterns, and actionable business insights.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080D18]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080D18]/80 backdrop-blur-xl border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RV</span>
              </div>
              <span className="text-[#F8FAFC] font-semibold text-xl">REVLYTICS</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#product" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">Product</Link>
              <Link href="/dashboard" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">Analytics</Link>
              <Link href="#how-it-works" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">How It Works</Link>
              <Link href="/case-study" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">Case Study</Link>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <a href="https://github.com/Gaurav63286/REVLYTICS" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                <Github size={20} />
              </a>
              <Link href="/dashboard" className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors font-medium">
                Explore Dashboard →
              </Link>
            </div>
            
            <button className="md:hidden text-[#F8FAFC]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3B82F6]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></span>
                <span className="text-[#3B82F6] text-sm font-medium">CUSTOMER FEEDBACK INTELLIGENCE</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#F8FAFC] leading-tight mb-6">
                Turn customer feedback into{' '}
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                  clear decisions.
                </span>
              </h1>
              
              <p className="text-xl text-[#94A3B8] mb-8 max-w-xl">
                Revlytics transforms thousands of unstructured customer reviews into sentiment intelligence, recurring issue patterns, and actionable business insights.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/upload" className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors font-medium flex items-center gap-2">
                  Upload CSV <ArrowRight size={18} />
                </Link>
                <Link href="/dashboard" className="px-6 py-3 bg-[#111827] text-[#F8FAFC] border border-[#1E293B] rounded-lg hover:bg-[#1E293B] transition-colors font-medium">
                  Explore Dashboard
                </Link>
                <Link href="/case-study" className="px-6 py-3 bg-[#111827] text-[#F8FAFC] border border-[#1E293B] rounded-lg hover:bg-[#1E293B] transition-colors font-medium">
                  View Case Study
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-[#111827] border border-[#1E293B] rounded-full text-sm text-[#94A3B8]">Python</span>
                <span className="px-3 py-1 bg-[#111827] border border-[#1E293B] rounded-full text-sm text-[#94A3B8]">Pandas</span>
                <span className="px-3 py-1 bg-[#111827] border border-[#1E293B] rounded-full text-sm text-[#94A3B8]">NumPy</span>
                <span className="px-3 py-1 bg-[#111827] border border-[#1E293B] rounded-full text-sm text-[#94A3B8]">Next.js</span>
                <span className="px-3 py-1 bg-[#111827] border border-[#1E293B] rounded-full text-sm text-[#94A3B8]">TypeScript</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 shadow-2xl shadow-[#3B82F6]/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#F8FAFC] font-semibold">CUSTOMER SENTIMENT</h3>
                  <span className="px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] text-xs rounded-full">● LIVE</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Positive</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#22C55E] rounded-full" style={{ width: '64.8%' }}></div>
                      </div>
                      <span className="text-[#22C55E] font-semibold">64.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Neutral</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '21.7%' }}></div>
                      </div>
                      <span className="text-[#F59E0B] font-semibold">21.7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Negative</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-[#EF4444] rounded-full" style={{ width: '13.5%' }}></div>
                      </div>
                      <span className="text-[#EF4444] font-semibold">13.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1E293B]">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F8FAFC]">8,420</div>
                    <div className="text-xs text-[#94A3B8]">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F8FAFC]">4.1</div>
                    <div className="text-xs text-[#94A3B8]">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F8FAFC]">98.4%</div>
                    <div className="text-xs text-[#94A3B8]">Accuracy</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#3B82F6]/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#06B6D4]/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-6 border-y border-[#1E293B]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#94A3B8] mb-6 uppercase tracking-wider">BUILT WITH MODERN DATA & WEB TECHNOLOGIES</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">Python</span>
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">Pandas</span>
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">NumPy</span>
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">TypeScript</span>
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">Next.js</span>
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">Recharts</span>
            <span className="px-4 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-[#94A3B8]">Vercel</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">THE PROBLEM</h2>
            <p className="text-xl text-[#94A3B8]">Customer feedback is everywhere. The insight isn't.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="text-[#3B82F6]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">UNSTRUCTURED</h3>
              <p className="text-[#94A3B8]">Thousands of reviews contain valuable information buried inside inconsistent text.</p>
            </div>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-12 h-12 bg-[#EF4444]/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-[#EF4444]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">NOISY</h3>
              <p className="text-[#94A3B8]">Duplicates, missing values and malformed records make raw feedback difficult to analyze.</p>
            </div>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-[#F59E0B]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">SLOW</h3>
              <p className="text-[#94A3B8]">Manually identifying recurring problems doesn't scale with growing customer feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 bg-[#0D1422]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">THE SOLUTION</h2>
            <p className="text-xl text-[#94A3B8]">From raw reviews to business intelligence.</p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            {[
              'CUSTOMER REVIEWS',
              'DATA CLEANING',
              'SENTIMENT ANALYSIS',
              'KEYWORD DETECTION',
              'STATISTICAL ANALYSIS',
              'ACTIONABLE INSIGHTS'
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-4 w-full max-w-md">
                <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 bg-[#111827] border border-[#1E293B] rounded-lg px-6 py-4 text-[#F8FAFC] font-medium">
                  {step}
                </div>
                {index < 5 && <ArrowRight className="text-[#94A3B8]" size={20} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="product" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">BUILT FOR REAL ANALYSIS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Sentiment Intelligence', desc: 'Understand how customers feel with transparent sentiment scoring.' },
              { icon: Zap, title: 'Issue Detection', desc: 'Identify recurring problems hidden across thousands of reviews.' },
              { icon: Shield, title: 'Data Cleaning', desc: 'Automatically handle duplicates, missing values and inconsistent records.' },
              { icon: BarChart3, title: 'Interactive Analytics', desc: 'Explore customer behavior through responsive charts and filters.' },
              { icon: TrendingUp, title: 'Business Insights', desc: 'Convert analytical results into concise decision-ready insights.' },
              { icon: Download, title: 'Exportable Data', desc: 'Download processed datasets and analytical results.' },
            ].map((feature, index) => (
              <div key={index} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 hover:border-[#3B82F6]/50 transition-colors group">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#3B82F6]/20 transition-colors">
                  <feature.icon className="text-[#3B82F6]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">{feature.title}</h3>
                <p className="text-[#94A3B8]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 px-6 bg-[#0D1422]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">DESIGNED TO MAKE DATA UNDERSTANDABLE.</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#F8FAFC] mb-2">8,420+</div>
              <div className="text-[#94A3B8]">REVIEWS ANALYZED</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#F8FAFC] mb-2">10</div>
              <div className="text-[#94A3B8]">ISSUE CLUSTERS</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#F8FAFC] mb-2">7</div>
              <div className="text-[#94A3B8]">ANALYTICS VIEWS</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#F8FAFC] mb-2">100%</div>
              <div className="text-[#94A3B8]">PORTFOLIO READY</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">HOW REVLYTICS WORKS</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">01</div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">UPLOAD</h3>
              <p className="text-[#94A3B8]">Upload your customer review dataset.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#06B6D4] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">02</div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">ANALYZE</h3>
              <p className="text-[#94A3B8]">Revlytics cleans, transforms and analyzes the feedback.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">03</div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">UNDERSTAND</h3>
              <p className="text-[#94A3B8]">Explore sentiment, recurring issues and business insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="py-24 px-6 bg-[#0D1422]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full text-[#3B82F6] text-sm font-medium mb-6">CASE STUDY</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-6">How 8,420 reviews became an analytics product.</h2>
          <p className="text-xl text-[#94A3B8] mb-8">Explore the engineering decisions, data pipeline, analytics methodology and product architecture behind Revlytics.</p>
          <Link href="/case-study" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors font-medium">
            Read the Case Study <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">END-TO-END DATA PIPELINE</h2>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            {[
              'CSV DATA',
              'PYTHON',
              'PANDAS / NUMPY',
              'ANALYTICS ENGINE',
              'NEXT.JS',
              'REVLYTICS'
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-4 w-full max-w-md">
                <div className="flex-1 bg-[#111827] border border-[#1E293B] rounded-lg px-6 py-4 text-[#F8FAFC] font-medium text-center">
                  {step}
                </div>
                {index < 5 && <ArrowDown className="text-[#94A3B8]" size={20} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#0D1422] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3B82F6]/10 via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-6">Stop reading reviews. Start understanding them.</h2>
          <p className="text-xl text-[#94A3B8] mb-8">Explore the analytics system and see what customer feedback can reveal when the data is structured correctly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors font-medium">
              Explore Revlytics →
            </Link>
            <a href="https://github.com/Gaurav63286/REVLYTICS" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#111827] text-[#F8FAFC] border border-[#1E293B] rounded-lg hover:bg-[#1E293B] transition-colors font-medium">
              <Github size={18} />
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RV</span>
                </div>
                <span className="text-[#F8FAFC] font-semibold text-xl">REVLYTICS</span>
              </div>
              <p className="text-[#94A3B8] text-sm">Customer Feedback Intelligence Platform</p>
            </div>
            
            <div>
              <h4 className="text-[#F8FAFC] font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">Analytics</Link></li>
                <li><Link href="/case-study" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">Case Study</Link></li>
                <li><Link href="/pipeline" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">Architecture</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#F8FAFC] font-semibold mb-4">Technology</h4>
              <p className="text-[#94A3B8] text-sm">Built with Next.js · TypeScript · Python · Pandas · NumPy</p>
            </div>
            
            <div>
              <a href="https://github.com/Gaurav63286/REVLYTICS" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#1E293B] text-center text-[#94A3B8] text-sm">
            <p>© 2026 Revlytics. Built as a data analytics engineering project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
