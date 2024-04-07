// import express from 'express';
// import cors from 'cors';
// import AuthRoutes from './app/route/auth.js'

// const app = express()

// app.use(express.json())
// app.use(cors())

// app.use("/auth", AuthRoutes)

// const PORT = 5001;
// app.listen(PORT, () => {
//     console.log("Server on Running Port :", PORT)
// })

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "103.24.202.50",
    port: 45454,
    user: "draj_o",
    password: "draj@12345",
    database: "irt_master",
    connectTimeout: 60000 // 60 seconds
});

db.connect(err => {
    if (err) {
        console.error('Error-------- connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});
// Endpoint for handling login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM login WHERE Username = ? AND Password = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query: ' + error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            if (results.length > 0) {
                // If login successful
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                // If login failed
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
