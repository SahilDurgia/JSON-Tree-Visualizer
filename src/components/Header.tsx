import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleTheme: () => void; // Add onToggleTheme to props
  isDarkMode: boolean; // Add isDarkMode to props
}

const Header: React.FC<HeaderProps> = ({ onSearch, onToggleTheme, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">JSON Tree Visualizer</h1>
      <div className="flex items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center mr-4">
          <input
            type="text"
            placeholder="Search JSON path (e.g., $.user.name)"
            className="p-2 rounded-md text-gray-800 w-80"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
        <button
          onClick={onToggleTheme}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
