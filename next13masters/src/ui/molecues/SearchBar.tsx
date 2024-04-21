'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (!query) {
      return;
    }
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for items"
      />
    </div>
  );
};
