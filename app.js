import express from 'express'
import { getArtists, createArtist, getArtistById, updateArtist, deleteArtist } from './mysql.js';

const app = express()

app.use(express.json());


// Get all artists
app.get('/artists', async (req, res) => {
  try {
    const artists = await getArtists();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get artist by ID
app.get('/artists/:id', async (req, res) => {
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
  });

// Create a new artist
app.post('/artists', async (req, res) => {
    try {
      const newArtist = req.body;
      await createArtist(newArtist);
      res.sendStatus(201)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Update artist info
  app.put('/artists/:id', async (req, res) => {
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
  });

  //Delete artist
  app.delete('/artists/:id', async (req, res) => {
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
  });


app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000/');
});

