import React from 'react'
import { useState, useEffect } from 'react'

interface Emoji {
    title: string;
    symbol: string;
    keywords: string;
  }


const Emojis = () => {
    const [emojis, setEmojis] = useState<Emoji[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const fetchEmojis = async () => {
        try {
          const response = await fetch('/emojis.json');
          const data = await response.json();

          console.log(data)

          setEmojis(data);
        } catch (error) {
          console.error('Error fetching emojis:', error);
        }
       
      };
      fetchEmojis();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    
      const filteredEmojis = emojis.filter((emoji) => {
        if (searchTerm === '') {
          return true; // Visa alla emojis om sökrutan är tom
        }
        const keywords = emoji.keywords.split(' ');
        return keywords.some((keyword) => keyword.includes(searchTerm));
      }).slice(0, 20); // Max 20 matchande emojis
    

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Type something to search for emojis..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />
      {searchTerm === '' ? (
        <>
          <div className="grid grid-cols-4 gap-4">
            {filteredEmojis.map((emoji) => (
              <div key={emoji.title} className="bg-blue-50 p-4 text-center rounded-md">
                <span className="text-2xl">{emoji.symbol}</span>
                <p className="mt-2">{emoji.title}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredEmojis.map((emoji) => (
            <div key={emoji.title} className="bg-gray-100 p-4 text-center rounded-md">
              <span className="text-2xl">{emoji.symbol}</span>
              <p className="mt-2">{emoji.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Emojis