// config/db.js

import mysql from 'mysql';

const pool = mysql.createPool({
    host: "103.24.202.50",
    user: "draj_o",
    password: "draj@12345",
    database: "irt_master"
});

export default pool;
