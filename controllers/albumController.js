import { getAlbums, createAlbum, getAlbumById, updateAlbum, deleteAlbum } from '../mysql.js';

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await getAlbums();
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await getAlbumById(albumId);

    if (album) {
      res.json(album);
    } else {
      res.status(404).json({ error: 'Album not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createNewAlbum = async (req, res) => {
  try {
    const newAlbum = req.body;
    await createAlbum(newAlbum);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateAlbumInfo = async (req, res) => {
    try {
      const albumId = req.params.id;
      const updatedAlbum = req.body;
  
      const success = await updateAlbum(albumId, updatedAlbum); 
  
      if (success) {
        res.json({ message: 'Album updated successfully' });
      } else {
        res.status(404).json({ error: 'Album not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export const deleteAlbumById = async (req, res) => {
  try {
    const albumId = req.params.id;

    const success = await deleteAlbum(albumId);

    if (success) {
      res.json({ message: 'Album deleted successfully' });
    } else {
      res.status(404).json({ error: 'Album not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};