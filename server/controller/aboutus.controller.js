const db = require("../config/database");

const aboutUsController = {
    create: async (req, res) => {
        try {
            const sql = 'INSERT INTO about_us (name, position, description) VALUES (?, ?, ?)';
            const [rows, cols] = await db.query(sql, [req.body.name, req.body.position, req.body.description]);
            return res.json({success: true, list: rows});
        } catch (error) {
            res.json({success: false, message: error});
        }
    },
    getAll: async (req, res) => {
        try {
            const sql = 'SELECT * FROM about_us';
            const [rows, cols] = await db.query(sql);
            return res.json({success: true, list: rows});
        } catch (error) {
            res.json({success: false, message: error});
        }
    }
}

module.exports = aboutUsController;