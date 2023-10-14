import React from 'react';

const CharacterCard = ({ character, onClick }) => {
  return (
    <div className="character-card" onClick={() => onClick(character) } style={{width: '22%'}}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p> 
    </div>
  );
};

export default CharacterCard;
