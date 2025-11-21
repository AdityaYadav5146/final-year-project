
const express = require('express');
require('dotenv').config();
const connectDB = require('./db/db');
const cors = require('cors');
const register = require('./routes/user.js');


const PORT = 3000;
const app = express();
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// CORS: allow specific origins (including Codespaces/GitHub.dev preview hosts)
app.use(cors());

app.get('/',(req,res)=>{
    res.end('sever is working fine')
})

// for middlewares
app.use('/api',register);


app.listen(PORT , ()=>{
    console.log(`Server is listening on port : ${PORT}`)
})