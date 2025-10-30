import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

interface HeaderProps {
  onSearch: (query: string) => void;
  hasData: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, hasData }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { theme, setTheme } = useTheme();

  const [effectiveTheme, setEffectiveTheme] = useState(theme);

  useEffect(() => {
    if (theme === 'system') {
      const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setEffectiveTheme(systemIsDark ? 'dark' : 'light');
    } else {
      setEffectiveTheme(theme);
    }
  }, [theme]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!hasData) {
      toast.warning('Please visualize JSON first before searching');
      return;
    }
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-gradient-to-r from-card via-card to-card/95 text-card-foreground backdrop-blur-sm border-b border-border/40 shadow-lg">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo/Title Section */}
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight whitespace-nowrap">
            JSON Tree Visualizer
          </h1>
          
          {/* Controls Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., $.user.name"
                  className="w-64 lg:w-80 px-5 py-2.5 pl-11 rounded-full bg-input/50 text-foreground text-sm border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/60 hover:bg-input/70"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Search Button */}
              <button
                type="submit"
                disabled={!hasData}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  hasData
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 hover:shadow-lg cursor-pointer'
                    : 'bg-secondary/50 text-secondary-foreground/50 cursor-not-allowed'
                }`}
                aria-label="Search"
                title={hasData ? 'Search JSON tree' : 'Visualize JSON first'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </form>
            
            {/* Theme Toggle Button - Night/Day */}
            <button
              onClick={toggleTheme}
              className="px-5 py-2.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 dark:from-indigo-600 dark:to-purple-700 text-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm flex items-center gap-2"
              aria-label="Toggle theme"
              title={effectiveTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {effectiveTheme === 'dark' ? (
                <>
                  {/* Sun icon for day mode */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  {/* Moon icon for night mode */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;