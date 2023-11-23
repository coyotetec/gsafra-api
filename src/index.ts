import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes';
import './database';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`✅ Server started at http://localhost:${PORT}`));
