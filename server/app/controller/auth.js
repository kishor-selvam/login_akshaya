import pool from "../config/db.js";

export const login = async (req, res) => {
    try {
        // Test database connection
        await pool.getConnection();

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const query = 'SELECT * FROM login WHERE Username = ? AND Password = ?';
        const result = await pool.query(query, [username, password]);

        console.log("Query Result:", result);

        if (!result || !result.results || result.results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const rows = result.results;
        console.log("Query Results:", rows);

        res.status(200).json({ message: "Login successful.", data: rows });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
