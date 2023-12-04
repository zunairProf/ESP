const mongoose = require('mongoose');
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({path: "backend/config.env"});
} else {
    dotenv.config({path: "backend/config.env"});
}

class Database {
    constructor() {
        console.log()
        this._connect();
    }

    _connect() {
        mongoose
            .connect(process.env.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error);
            });
    }
}

module.exports = new Database();
