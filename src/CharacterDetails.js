import React from 'react';

const CharacterDetails = ({ character, onClose }) => {
  return (
    <div className="character-details" style={{height: '30%'}}>
      <button onClick={onClose}>Close</button>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      {character.type && <p>Type: {character.type}</p>}
      {character.origin && <p>Origin: {character.origin.name}</p>}
      {character.location && <p>Location: {character.location.name}</p>}
      {character.episode && <p>Episodes: {character.episode.length}</p>}
      <p>URL: {character.url}</p>
    </div>
  );
};

export default CharacterDetails;
