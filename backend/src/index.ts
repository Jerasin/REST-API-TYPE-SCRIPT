import express, { Application, Request, Response } from 'express';
import cors from 'cors';


   
import db from "./config/db.config";

db.sync().then(() => {
	console.log("connect to db");
});

import users from './controllers/User/api_users'
import proucts from './controllers/Product/api_product';
const app: Application = express();

const PORT: number = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/authen',users)
app.use('/api/product',proucts)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server5557');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});