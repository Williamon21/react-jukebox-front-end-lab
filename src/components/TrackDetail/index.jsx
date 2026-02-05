import React from "react";

const TrackDetail = ({ track, handleFormOpen, handleDelete }) => {
  if (!track) {
    return (
      <div className="details-container">
        <h1>Please Select a Track</h1>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h1>{track.title}</h1>
      <p>Title: {track.title}</p>
      <p>Artist: {track.artist}</p>
      <p>Length: {track.length}</p>
      <p>Release Year: {track.releaseYear}</p>
      <div className="button-container">
        <button onClick={() => handleFormOpen(track)}>Edit Track</button>
        <button onClick={() => handleDelete(track._id)}>Delete Track</button>
      </div>
    </div>
  );
};

export default TrackDetail;
