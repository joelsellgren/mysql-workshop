import express from 'express';
import { getAllArtists, getArtist, createNewArtist, updateArtistInfo, deleteArtistById } from './controllers/artistController.js';
import { router as artistRouter } from './routes/artistRoutes.js'

const app = express();

app.use(express.json());

app.use('/api/artists', artistRouter)

app.listen(8000, () => {
  console.log('http://localhost:8000/');
});
