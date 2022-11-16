const express = require('express');
const cors = require('cors'); // so that server sends data to ports thar we require
const bodyParser= require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(
    {
        origin : 'http://localhost:3000',
        optionsSuccessStatus: 200
    }
));       // so that server sends data to only client port(3000)

require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utils/connectDb.js");
connectDb();


const PORT  = process.env.PORT || 8080; // need to setup port value in .env file


// Routes
app.use('/food-item', require('./api/food-item'));


app.listen(PORT,()=> {
    console.log(`Server listening on port ${PORT}`);
})



