import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Facebook, Mail, PlayCircle, Headphones, Heart } from 'lucide-react';
import AudioPlayer from './components/AudioPlayer';
import BabeoBot from './components/BabeoBot';
import SleepChart from './components/SleepChart';
import { EPISODES, CATEGORIES, TESTIMONIALS, ARTICLES } from './constants';
import { Episode } from './types';

// --- Page Components ---

const Hero = () => (
  <section className="relative bg-babeo-beige py-16 md:py-24 px-6 overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-babeo-peach rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-babeo-sage rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>
    
    <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white text-babeo-green text-sm font-semibold tracking-wide shadow-sm mb-2">
          New Episode Out Now
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-babeo-stone leading-tight">
          Gentle voices for <br/><span className="text-babeo-terracotta">growing families.</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
          A podcast dedicated to evidence-based, emotionally supportive guidance for pregnancy, postpartum, and the first years of parenthood.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
          <Link to="/podcast" className="bg-babeo-stone text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors shadow-lg flex items-center justify-center gap-2">
            <PlayCircle size={20} /> Listen Now
          </Link>
          <Link to="/subscribe" className="bg-white text-babeo-stone border border-babeo-stone/20 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            Subscribe
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="relative">
          <div className="absolute inset-0 bg-babeo-terracotta/20 rounded-full transform rotate-6 scale-95"></div>
          <img 
            src="https://picsum.photos/600/600?random=99" 
            alt="Mother holding baby" 
            className="rounded-3xl shadow-2xl relative z-10 w-full max-w-md mx-auto object-cover aspect-square"
          />
        </div>
      </div>
    </div>
  </section>
);

const EpisodeCard: React.FC<{ episode: Episode, onPlay: (e: Episode) => void }> = ({ episode, onPlay }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-babeo-beige flex flex-col h-full group">
    <div className="relative overflow-hidden rounded-xl mb-4">
      <img src={episode.coverImage} alt={episode.title} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
      <button 
        onClick={() => onPlay(episode)}
        className="absolute bottom-3 right-3 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-babeo-stone shadow-lg hover:scale-110 transition-transform"
      >
        <PlayCircle size={24} fill="currentColor" className="text-babeo-terracotta" />
      </button>
    </div>
    <div className="flex-1 flex flex-col">
      <span className="text-xs font-bold text-babeo-green uppercase tracking-wider mb-2">{episode.category}</span>
      <h3 className="font-display text-lg font-bold text-gray-800 mb-2 leading-tight flex-1">
        <Link to={`/podcast/${episode.id}`} className="hover:text-babeo-terracotta transition-colors">{episode.title}</Link>
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{episode.summary}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-gray-400 font-medium">
        <span>{episode.publishDate}</span>
        <span>{episode.duration}</span>
      </div>
    </div>
  </div>
);

const PodcastPage = ({ onPlay }: { onPlay: (e: Episode) => void }) => {
  const [filter, setFilter] = useState('All');
  
  const filteredEpisodes = filter === 'All' 
    ? EPISODES 
    : EPISODES.filter(e => e.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="font-display text-3xl font-bold mb-8 text-center">Podcast Episodes</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        <button 
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'All' ? 'bg-babeo-stone text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
        >
          All Topics
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat.id ? 'bg-babeo-terracotta text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEpisodes.map(ep => (
          <EpisodeCard key={ep.id} episode={ep} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
};

const ResourcesPage = () => (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <h2 className="font-display text-3xl font-bold mb-8">Parenting Resources</h2>
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {ARTICLES.map(article => (
        <div key={article.id} className="flex gap-4 items-start">
          <img src={article.imageUrl} alt={article.title} className="w-24 h-24 rounded-xl object-cover" />
          <div>
             <span className="text-xs font-bold text-babeo-green uppercase tracking-wider">{article.category}</span>
             <h3 className="font-display font-bold text-lg mb-1">{article.title}</h3>
             <p className="text-sm text-gray-500 mb-2">{article.excerpt}</p>
             <button className="text-babeo-terracotta text-sm font-semibold hover:underline">Read Article</button>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-babeo-cream p-8 rounded-3xl border border-babeo-beige">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-babeo-sage rounded-full text-babeo-stone"><Headphones size={20} /></div>
        <h3 className="font-display text-xl font-bold">Sleep Science Corner</h3>
      </div>
      <p className="mb-6 text-gray-600">Understanding your baby's sleep cycles is the first step to better rest for everyone. Here is a typical 60-minute newborn cycle visualized.</p>
      <SleepChart />
    </div>
  </div>
);

// --- Layout & Main App ---

const App: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handlePlay = (episode: Episode) => {
    if (currentEpisode?.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-babeo-beige">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-babeo-terracotta rounded-full flex items-center justify-center text-white">
              <Heart size={16} fill="currentColor" />
            </div>
            <span className="font-display text-2xl font-bold text-babeo-stone">Babeo<span className="text-babeo-terracotta">Life</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-babeo-terracotta transition-colors">Home</Link>
            <Link to="/podcast" className="hover:text-babeo-terracotta transition-colors">Podcast</Link>
            <Link to="/resources" className="hover:text-babeo-terracotta transition-colors">Resources</Link>
            <Link to="/about" className="hover:text-babeo-terracotta transition-colors">About</Link>
            <Link to="/subscribe" className="px-5 py-2 rounded-full bg-babeo-stone text-white hover:bg-gray-700 transition-colors">Subscribe</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-babeo-beige p-6 shadow-xl animate-fade-in-down">
            <nav className="flex flex-col gap-4 text-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-babeo-terracotta">Home</Link>
              <Link to="/podcast" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-babeo-terracotta">Podcast</Link>
              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-babeo-terracotta">Resources</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-babeo-terracotta">About</Link>
              <Link to="/subscribe" onClick={() => setIsMobileMenuOpen(false)} className="py-3 bg-babeo-green text-white rounded-xl">Subscribe</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              {/* Featured Section */}
              <section className="py-16 px-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                  <h2 className="font-display text-3xl font-bold text-babeo-stone">Latest Episodes</h2>
                  <Link to="/podcast" className="text-babeo-terracotta font-semibold hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {EPISODES.slice(0, 4).map(ep => (
                    <EpisodeCard key={ep.id} episode={ep} onPlay={handlePlay} />
                  ))}
                </div>
              </section>

              {/* Categories Grid */}
              <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                  <h2 className="font-display text-3xl font-bold text-babeo-stone text-center mb-12">Browse by Topic</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {CATEGORIES.map(cat => (
                      <Link to="/podcast" key={cat.id} className={`p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-transform hover:scale-105 ${cat.color} bg-opacity-30`}>
                        <span className="font-display font-bold text-lg">{cat.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials */}
              <section className="py-16 px-6 max-w-4xl mx-auto text-center">
                 <h2 className="font-display text-3xl font-bold text-babeo-stone mb-12">From Our Community</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                   {TESTIMONIALS.map(t => (
                     <div key={t.id} className="bg-babeo-cream p-6 rounded-2xl border border-babeo-beige">
                       <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
                       <p className="font-bold text-sm">{t.name}</p>
                       <p className="text-xs text-gray-500 uppercase">{t.role}</p>
                     </div>
                   ))}
                 </div>
              </section>
            </>
          } />
          
          <Route path="/podcast" element={<PodcastPage onPlay={handlePlay} />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={
            <div className="max-w-3xl mx-auto px-6 py-16 text-center">
              <h1 className="font-display text-4xl font-bold mb-6">About BabeoLife</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                BabeoLife was born from a simple belief: parenting shouldn't feel like a constant state of panic. 
                We provide a calm corner of the internet where science meets instinct.
              </p>
              <div className="p-8 bg-babeo-sage/20 rounded-3xl">
                <h3 className="font-display text-xl font-bold mb-4">Our Philosophy</h3>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex gap-3"><Heart className="text-babeo-terracotta shrink-0" /> <span>Gentle discipline and responsive parenting.</span></li>
                  <li className="flex gap-3"><Heart className="text-babeo-terracotta shrink-0" /> <span>Evidence-based information, not fear-mongering.</span></li>
                  <li className="flex gap-3"><Heart className="text-babeo-terracotta shrink-0" /> <span>Inclusivity for all family structures.</span></li>
                </ul>
              </div>
            </div>
          } />
          <Route path="/subscribe" element={
            <div className="max-w-md mx-auto px-6 py-16 text-center">
              <h1 className="font-display text-3xl font-bold mb-6">Join the Family</h1>
              <p className="text-gray-600 mb-8">Get weekly gentle guidance delivered to your inbox. No spam, just support.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-babeo-terracotta" />
                <button className="bg-babeo-stone text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700">Join</button>
              </div>
            </div>
          } />
          {/* Detailed Episode View (Simplified for this demo) */}
          <Route path="/podcast/:id" element={
            <div className="max-w-4xl mx-auto px-6 py-12">
               {/* Logic to find episode would go here, displaying placeholder for now */}
               <Link to="/podcast" className="text-babeo-stone hover:underline mb-4 inline-block">&larr; Back to Podcast</Link>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-babeo-beige">
                 <h1 className="font-display text-3xl font-bold mb-4">Episode Details</h1>
                 <p className="text-gray-600">Full show notes, transcript, and resources for this episode would appear here in a production build, fetched based on the ID.</p>
               </div>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-babeo-stone text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold mb-2">BabeoLife</h3>
            <p className="text-gray-400 text-sm">Gentle guidance for the journey of a lifetime.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-babeo-terracotta transition-colors"><Instagram size={24} /></a>
            <a href="#" className="hover:text-babeo-terracotta transition-colors"><Twitter size={24} /></a>
            <a href="#" className="hover:text-babeo-terracotta transition-colors"><Facebook size={24} /></a>
            <a href="#" className="hover:text-babeo-terracotta transition-colors"><Mail size={24} /></a>
          </div>
          <p className="text-gray-500 text-xs">&copy; 2024 BabeoLife. All rights reserved.</p>
        </div>
      </footer>

      {/* Persistent Components */}
      <AudioPlayer 
        currentEpisode={currentEpisode} 
        isPlaying={isPlaying} 
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onClose={() => {
          setIsPlaying(false);
          setCurrentEpisode(null);
        }}
      />
      
      <BabeoBot />
    </div>
  );
};

export default App;