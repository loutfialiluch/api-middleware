const express = require("express") ;
const morgan = require("morgan") ;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const data = require('./data.json');
const dotenv = require("dotenv");
const cors = require("cors");


//Environment Variables
dotenv.config();

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });



const app = express();



const PORT = process.env.PORT || 5000;

//Middlewares
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());
app.use(cors());
app.enable("trust proxy");



// Routes
app.get('/', (req, res) => {
    res.json(data);

    // GET IP ADDRESS OF CLIENT : req.ip

})


app.get('/ip', (req, res) => {
    res.send(req.ip);
})

app.post('/', async (req,res) => {
    const {body} = req;
    try {
        const {data, status} = await axios.post('https://80faf6c3ef02.ngrok.io/orange', body);
        res.json(data).status(status);
    } catch (error) {
        res.json({
            success : false,
            errorMessage : "Error Middleware"
        }).status(500);
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})