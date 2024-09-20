const express = require('express');
const mongoose = require('mongoose');
const app = express();
import { config } from "nodemon";

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

export const db_url = config.get<String>("DB_TYPE") ? "local" 
`mongodb:${config.get<string>("DB_USERNAME")}//:${config.get<string>("DB_PASSWORD")}@${config.get<string>("DB_HOST")}:${config.get<string>("DB_PORT")}/${config.get<string>("DB_NAME")}` : 
`mongodb+srv:${config.get<string>("DB_USERNAME")}//:${config.get<string>("DB_PASSWORD")}@${config.get<string>("DB_CLUSTER")}.${config.get<string>("DB_HASH")}.mongodb.net/?retryWrites=true&w=majority&appName=${config.get<string>("DB_NAME")}`


app.listen(PORT, ()=>{
    mongoose.connect(db_url).then(res=>console.log('Connected to db'))
    console.log(`Server running: http://localhost:${PORT}`);
})