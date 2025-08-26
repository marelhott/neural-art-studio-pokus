import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Palette, 
  Moon, 
  Sun, 
  Settings, 
  HelpCircle, 
  Github,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
}

export function Header({ isDark, toggleDark }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Palette className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight">StyleFlow</h1>
              <p className="text-xs text-muted-foreground font-mono">
                Neural Style Transfer
              </p>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
              <Sparkles className="w-3 h-3 mr-1" />
              Beta
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Galerie
          </Button>
          <Button variant="ghost" size="sm">
            Předvolby
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            Nápověda
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Github className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button size="sm" className="hidden sm:flex">
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade Pro
          </Button>
        </div>
      </div>
    </header>
  );
}