import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trendingPlayers = [
  { name: 'Faker', tag: 'KR1', region: 'KR' },
  { name: 'Caps', tag: 'EUW', region: 'EUW' },
  { name: 'Doublelift', tag: 'NA1', region: 'NA' },
  { name: 'Chovy', tag: 'KR1', region: 'KR' },
];

export const SearchHero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const parts = query.split('#');
    if (parts.length === 2 && parts[0] && parts[1]) {
      navigate(`/profile/${parts[0]}/${parts[1]}`);
    }
  };

  const handleTrending = (name: string, tag: string) => {
    navigate(`/profile/${name}/${tag}`);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[75vh] px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            The Rift,{' '}
            <span className="text-gradient">Quantified.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Deep-dive into any summoner's performance with precision analytics.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center glass-surface rounded-xl p-2">
            <Search className="ml-4 text-muted-foreground" size={20} />
            <input
              className="flex-1 bg-transparent px-4 py-3 outline-none text-lg placeholder:text-muted-foreground/50 font-body"
              placeholder="Summoner Name + #TAG"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="hero" size="xl" onClick={handleSearch}>
              Analyze
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 text-sm"
        >
          <span className="text-muted-foreground">Trending:</span>
          {trendingPlayers.map(({ name, tag }) => (
            <button
              key={`${name}#${tag}`}
              onClick={() => handleTrending(name, tag)}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {name}#{tag}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
