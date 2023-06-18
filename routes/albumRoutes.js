import express from 'express';
import * as albumController from '../controllers/albumController.js';

const router = express.Router();

router.route('/')
  .get(albumController.getAllAlbums)
  .post(albumController.createNewAlbum);

router.route('/:id')
  .get(albumController.getAlbum)
  .put(albumController.updateAlbumInfo)
  .delete(albumController.deleteAlbumById);

export { router };
