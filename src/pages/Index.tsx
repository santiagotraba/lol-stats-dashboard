import { SearchHero } from '@/components/home/SearchHero';
import { Navbar } from '@/components/layout/Navbar';

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <SearchHero />
    <footer className="text-center py-8 text-xs text-muted-foreground border-t border-border/20">
      <p>RiftScope is not endorsed by Riot Games. League of Legends is a trademark of Riot Games, Inc.</p>
    </footer>
  </div>
);

export default Index;
