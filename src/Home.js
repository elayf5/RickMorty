import React, { useState, useEffect } from 'react';
import RickMortyWall from './RickMortyWall.jpg';

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characterData = []; 
        for (let charIndex = 1; charIndex < 6; charIndex++) {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${charIndex}`);
          const character = await response.json();
          characterData.push(character); 
        }
        setCharacters(characterData);
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
        <img src={RickMortyWall} alt={"WallPaper"} width={'80%'} height={'10%'} />
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
              style={{ width: '250px', paddingLeft: '75px' }} 
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
