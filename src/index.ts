import express from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';
import './database';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`));
