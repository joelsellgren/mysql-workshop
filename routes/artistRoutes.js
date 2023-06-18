import express from 'express';
import * as artistController from '../controllers/artistController.js';

const router = express.Router();

router.route('/')
  .get(artistController.getAllArtists)
  .post(artistController.createNewArtist);

router.route('/:id')
  .get(artistController.getArtist)
  .put(artistController.updateArtistInfo)
  .delete(artistController.deleteArtistById);

export { router };
