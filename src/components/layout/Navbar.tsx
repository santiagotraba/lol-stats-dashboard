import { Link } from 'react-router-dom';
import { Swords } from 'lucide-react';

export const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
    <div className="container flex items-center justify-between h-14 px-4">
      <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
        <Swords className="text-primary" size={22} />
        <span>RiftScope</span>
      </Link>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
      </div>
    </div>
  </nav>
);
