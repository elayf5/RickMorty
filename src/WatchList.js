import React, { useState, useEffect } from 'react';
import './WatchList.css'

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : [];
};


const WatchList = () => {
  const [newEpisode, setNewEpisode] = useState('');
  const [episodes, setEpisodes] = useState(getFromLocalStorage('episodes'));

  useEffect(() => {
    saveToLocalStorage('episodes', episodes);
  }, [episodes]);

  const handleInputChange = (event) => {
    setNewEpisode(event.target.value);
  };

  const handleAddEpisode = () => {
    if (newEpisode.trim() !== '') {
      const formatRegex = /^s\d{2}e\d{2}$/;
  
      if (formatRegex.test(newEpisode)) {
        setEpisodes([...episodes, { name: newEpisode, completed: false }]);
        setNewEpisode('');
      } else {
        alert("Invalid format. Please use the format 's02e12'.");
      }
    }
  };

  const handleRemoveEpisode = (index) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes.splice(index, 1);
    setEpisodes(updatedEpisodes);
  };

  const handleToggleCompletion = (index) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes[index].completed = !updatedEpisodes[index].completed;
    setEpisodes(updatedEpisodes);
  };

  return (
    <div >
      <h2> My Watch List Page</h2>
      <div >
      <input
        type="text"
        placeholder="Add a new episode with format s(xx)e(xx)"
        value={newEpisode}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddEpisode();
          }
        }
      }
    style={{ width: '40%', padding: '10px', fontSize: '18px' , backgroundColor: ""}}
/>

        <button
          onClick={handleAddEpisode}
          style={{ padding: '10px', fontSize: '18px', marginLeft: '10px', backgroundColor:''}}
        >
          Add
        </button>
      </div>
      <div className='episodes' style={{width: '100%'}}>
      <ul>
        {episodes.map((episode, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={episode.completed}
              onChange={() => handleToggleCompletion(index)}
              style={{marginRight: '10px' }}
            />
            {episode.name}
            <button onClick={() => handleRemoveEpisode(index)} style={{marginLeft: '10px' }}>Remove Episode</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default WatchList;

