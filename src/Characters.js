import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import CharacterDetails from './CharacterDetails'

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // Track details modal state

  const charactersRestApi = `https://rickandmortyapi.com/api/character?page=${currentPage}${
  selectedStatus ? `&status=${selectedStatus}` : ''
    }${
  selectedGender ? `&gender=${selectedGender}` : ''
    }${
  selectedSpecies ? `&species=${selectedSpecies}` : ''
    }`;

  useEffect(() => {
    fetch(charactersRestApi)
      .then((response) => response.json()) 
      .then((data) => {
        setCharacters(data.results);
        setHasNextPage(!!data.info.next);
        setHasPrevPage(!!data.info.prev);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };
  
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setCurrentPage(1);
  };
  
  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
    setCurrentPage(1);
  };
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsDetailsOpen(true);

  };
  const handleModalClose = () => {
    setSelectedCharacter(null);
    setIsDetailsOpen(false);
  };
  
  const filteredCharacters = characters.filter((character) => {
    const statusMatch = !selectedStatus || character.status.toLowerCase() === selectedStatus;
    const genderMatch = !selectedGender || character.gender.toLowerCase() === selectedGender;
    const speciesMatch = !selectedSpecies || character.species === selectedSpecies;
    return statusMatch && genderMatch && speciesMatch;
  });

  return (
    <div>
      <h2>Characters Page</h2>
      <div style={{marginBottom: "10px"}}> 
      <select value={selectedStatus} onChange={handleStatusChange} style={{marginRight:'10px'}}>
    <option value="">All Status</option>
    <option value="alive">Alive</option>
    <option value="dead">Dead</option>
    <option value="unknown">Unknown</option>
    </select>


    <select value={selectedGender} onChange={handleGenderChange} style={{marginRight:'10px'}} >
    <option value="">All Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="unknown">Unknown</option>
    </select>

    <select value={selectedSpecies} onChange={handleSpeciesChange} style={{marginRight:'10px'}}>
    <option value="">All Species</option>
    <option value="Human">Human</option>
    <option value="Alien">Alien</option>
    <option value="Unknown">Unknown</option>
    <option value="Humanoid">Humanoid</option>
    <option value="Poopybutthole">Poopybutthole</option>
    <option value="Mythological Creature">Mythological Creature</option>
    </select>

      {hasPrevPage && (
          <button onClick={handlePreviousPage} style={{marginRight:'10px'}}> Previous Page </button>
        )}
  <span style={{ fontSize: '17px' }}>Current Page: {currentPage}</span>
        {hasNextPage && (
            <button onClick={handleNextPage} style={{marginLeft:'10px'}}> Next Page </button>
            )}
      </div>

      <div className="character-list">
      {isDetailsOpen ? <CharacterDetails character={selectedCharacter} onClose={handleModalClose} /> : filteredCharacters.map((character) => (          
          <CharacterCard key={character.id} character={character} onClick={() => handleCharacterClick(character)} />
          ) ) }         
      </div>
    </div>
  );
};

export default Characters;
