import express from 'express';
import { routes } from './routes';
import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000, () => console.log(`🔥 Server started at http://localhost:${process.env.PORT || 3000}`));
