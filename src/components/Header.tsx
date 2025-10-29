import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
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
      <form onSubmit={handleSearchSubmit} className="flex items-center">
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
    </header>
  );
};

export default Header;
