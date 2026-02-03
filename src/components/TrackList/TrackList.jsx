import React from "react";

const TracksList = ({ tracks, handleSelect, handleFormOpen }) => {
  return (
    <div className="sidebar-container">
      <h1>Track List</h1>
      <div className="list-container">
        {!tracks.length ? (
          <h1>No Tracks</h1>
        ) : (
          <ul>
            {tracks.map((track) => {
              return (
                <li key={track._id} onClick={() => handleSelect(track)}>
                  {track.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button onClick={handleFormOpen}>New Track</button>
    </div>
  );
};

export default TracksList;
