import express from 'express';
import { router as artistRouter } from './routes/artistRoutes.js'
import { router as albumRouter } from './routes/albumRoutes.js'

const app = express();

app.use(express.json());

app.use('/api/artists', artistRouter)
app.use('/api/albums', albumRouter)

app.listen(8000, () => {
  console.log('http://localhost:8000/');
});
