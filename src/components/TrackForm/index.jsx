import { useState, useEffect } from "react";

const initialState = {
  title: "",
  artist: "",
  length: "",
  releaseYear: "",
  coverUrl: "",
};

const TrackForm = ({
  handleAddTrack,
  handleUpdateTrack,
  handleFormOpen,
  selected,
}) => {
  const [formData, setFormData] = useState(initialState);

  // Update formData if editing a selected track
  useEffect(() => {
    if (selected) {
      setFormData({
        title: selected.title || "",
        artist: selected.artist || "",
        length: selected.length || "",
        releaseYear: selected.releaseYear || "",
        coverUrl: selected.coverUrl || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops default form submit behaviour
    try {
      if (selected) {
        await handleUpdateTrack(formData, selected._id);
      } else {
        await handleAddTrack(formData);
      }

      handleFormOpen();
      setFormData(initialState); // reset form after submission
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />

        <label htmlFor="length">Length</label>
        <input
          type="text"
          name="length"
          value={formData.length}
          onChange={handleChange}
          required
        />

        <label htmlFor="releaseYear">Release Year</label>
        <input
          type="text"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
        />

        <label htmlFor="coverUrl">Cover Art URL</label>
        <input
          type="text"
          name="coverUrl"
          value={formData.coverUrl}
          onChange={handleChange}
        />

        <button type="submit">
          {selected ? "Update Track" : "Add New Track"}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
