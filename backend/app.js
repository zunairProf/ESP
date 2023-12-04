const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const cors = require("cors");
const CONSTANTS = require('./globalContants');
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({path: "backend/config.env"});
} else {
    dotenv.config({path: "backend/config.env"});
}

const path = require('path');
const fileURLToPath = require('url');
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(CONSTANTS.BASE_URL, userRoutes);
app.use(CONSTANTS.BASE_URL, postRoutes);

// Serve React app
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
