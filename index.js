import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
    
import Connection from './database/db.js';
import router from './routes/route.js';
dotenv.config();

const PORT= process.env.PORT || 8000;
const app=express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/',router);


app.listen(PORT,()=> console.log(`Server is running successfully on PORT ${PORT}`));

Connection();