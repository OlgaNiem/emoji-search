import React from 'react'
import { useState, useEffect } from 'react'

interface Emoji {
    title: string;
    symbol: string;
    keywords: string;
  }

const Emojis = () => {
    const [emojis, setEmojis] = useState<Emoji[]>([]);
    const [searchEmoji, setSearchEmoji] = useState('');

    useEffect(() => {
      const fetchEmojis = async () => {
        try {
          const response = await fetch('/emojis.json');
          const data = await response.json();
          console.log(data)

          setEmojis(data);
        } catch (error) {
          console.error('Error, emojis fetching problems', error);
        }
      };
      fetchEmojis();
    }, []);

      const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchEmoji(event.target.value);
      };
    
      const emojisFilter = emojis.filter((emoji) => {
        if (searchEmoji === '') {
          return true;
          }
        const usedKeyword = emoji.keywords.split(' ');
        return usedKeyword.some((keyword) => keyword.includes(searchEmoji));
      }).slice(0, 20); 
  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Type something to search for emojis..."
        value={searchEmoji}
        onChange={changeSearch}
        className="w-full mb-4 p-2 border border-blue-200 rounded-md"
      />
      {searchEmoji === '' ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {emojisFilter.map((emoji) => (
              <div key={emoji.title} className="bg-blue-50 p-4 text-center border border-blue-200 rounded-md">
                <span className="text-2xl">{emoji.symbol}</span>
                <p className="mt-2">{emoji.title}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {emojisFilter.map((emoji) => (
            <div key={emoji.title} className="bg-yellow-50 p-4 text-center border border-yellow-200 rounded-md">
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