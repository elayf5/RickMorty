import React, { useState, useEffect } from 'react';
import RickMortyWall from "./RickMortyWall.jpg"

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response1 = await fetch('https://rickandmortyapi.com/api/character/1');
        const character1 = await response1.json();

        const response2 = await fetch('https://rickandmortyapi.com/api/character/2');
        const character2 = await response2.json();

        setCharacters([character1, character2]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div >
      <h2>Welcome to Rick and Morty Fan Page</h2>
      <div >
        <img src={RickMortyWall } width={'80%'} height={'10%'} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        {characters.map((character) => (
          <div
            key={character.id}
            style={{ textAlign: 'center', padding: '20px' }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: '250px', paddingLeft: '100px' }} 
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
