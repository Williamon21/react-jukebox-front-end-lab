import React from "react";

const NowPlaying = ({ track }) => {
  if (!track) {
    return (
      <div className="now-playing">
        <h2>Nothing Playing</h2>
        <p>Select a track to start playback.</p>
      </div>
    );
  }

  return (
    <div className="now-playing">
      <h2>Now Playing</h2>

      <div className="track-info">
        <h3>{track.title}</h3>
        <p>{track.artist}</p>
        {track.album && <p><em>{track.album}</em></p>}
      </div>

      {track.coverUrl && (
        <img
          src={track.coverUrl}
          alt={`${track.title} cover`}
          className="cover-art"
        />
      )}

      {track.audioUrl && (
        <audio controls src={track.audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default NowPlaying;
