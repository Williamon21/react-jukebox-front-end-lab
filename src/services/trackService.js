const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

// Get all tracks from the back end server
const index = () => {
  // Old school way of doing async await, used then and callbacks
  return fetch(BASE_URL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// create a track
const create = async (track) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    });

    const data = await res.json();
    return data.track;
  } catch (error) {
    console.log(error);
    return { err: error.message }; 
  }
};



// update a track
const update = async (formData, trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data.track;
  } catch (error) {
    console.log(error);
  }
};

// delete a track by id
const deleteTrack = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data.track;
  } catch (error) {
    console.log(error);
  }
};

export { index, create, update, deleteTrack };

// currently playing track

const nowPlaying = async (trackId) => {
    try {
        const res = await fetch(`${BASE_URL}/playing/${trackId}`, {
            method: "GET",
        });
        const data = await res.json();
        return data.track;
    } catch (error) {
        console.log(error);
    }
};

export { nowPlaying };