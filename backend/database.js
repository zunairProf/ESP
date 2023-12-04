const mysql = require('mysql');

// MySQL Connection
const db = mysql.createConnection({
    host: 'sql8.freesqldatabase.com',
    user: 'sql8662465',
    password: '1vBDVyD7N7',
    database: 'sql8662465',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;