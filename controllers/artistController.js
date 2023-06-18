import { getArtists, createArtist, getArtistById, updateArtist, deleteArtist, getArtistsAndAlbums } from '../mysql.js';

export const getAllArtists = async (req, res) => {
  try {
    const artists = await getArtists();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artistId = req.params.id;
    const artist = await getArtistById(artistId);

    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllArtistsAndAlbums = async (req, res) => {
    try {
      const artistsAndAlbums = await getArtistsAndAlbums();
      res.json(artistsAndAlbums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const createNewArtist = async (req, res) => {
  try {
    const newArtist = req.body;
    await createArtist(newArtist);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateArtistInfo = async (req, res) => {
    try {
      const artistId = req.params.id;
      const updatedArtist = req.body;
  
      const success = await updateArtist(artistId, updatedArtist);
  
      if (success) {
        res.json({ message: 'Artist updated successfully' });
      } else {
        res.status(404).json({ error: 'Artist not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export const deleteArtistById = async (req, res) => {
  try {
    const artistId = req.params.id;

    const success = await deleteArtist(artistId);

    if (success) {
      res.json({ message: 'Artist deleted successfully' });
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
