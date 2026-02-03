import { useState, useEffect } from "react";
import "./App.css";
// import { index } from "./services/trackService";
import * as trackService from "./services/trackService";
import TracksList from "./components/TrackList";
import TrackDetail from "./components/TrackDetail";
import TrackForm from "./components/TrackForm";

function App() {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksFromDB = await trackService.index();
        if (tracksFromDB.err) {
          throw new Error(tracksFromDB.err);
        }
        setTracks(tracksFromDB);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // only run on initial page load

  const handleSelect = (track) => {
    setSelected(track);
  };

  const handleFormOpen = (track) => {
    if (!track?._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    const newTrack = await trackService.create(formData);
    if (newTrack.err) {
      throw new Error(newTrack.error);
    }
    setTracks([...tracks, newTrack]);
    handleSelect(newTrack);
  };

  const handleUpdateTrack = async (formData, _id) => {
    const updatedTrack = await trackService.update(formData, _id);
    setSelected(updatedTrack);
    const newtracksArray = tracks.map((track) => {
      // console.log(track._id, updatedTrack._id)
      return track._id === updatedTrack._id ? updatedTrack : track; //else we will return the unchanged track
    });
    setTracks(newtracksArray);
  };

  const handleDelete = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);
      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }
      const newtracksArray = tracks.filter((track) => track._id !== deletedTrack._id);
      setTracks(newtracksArray);
      setSelected(null);
    } catch (error) {
      console.log(error.message)
    }
  };

  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <>
      <TracksList
        tracks={tracks}
        handleSelect={handleSelect}
        handleFormOpen={handleFormOpen}
      />

      {isFormOpen ? (
        <TrackForm
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
          handleFormOpen={handleFormOpen}
          handleSelect={handleSelect}
          handleAddTrack={handleAddTrack}
        newTrack/>
        ) : (
        <TrackDetail
          track={selected}
          handleFormOpen={handleFormOpen}
          handleDelete={handleDelete}
        />
      )}
      <NowPlaying 
        track={selectedTrack} />
    </>
  ) ;
}

export default App;
