import express from 'express';
import { dbConnect } from './app.js'; // Importez votre configuration PostgreSQL

const app = express();
const port = 3001;

app.use(express.json());

dbConnect().then((client) => {
  console.log('Connected to PostgreSQL database');
});