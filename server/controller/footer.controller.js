const db = require("../config/database");

const footerController = {
    get: async (req, res) => {
        try {
            const [rows, cols] = await db.query('SELECT * FROM footer');
            return res.json({ success: true, list: rows });
        } catch (error) {
            return res.json({ success: false, message: error });
        }
    },
    update: async (req, res) => {
        try {
            const data = {
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                text1: req.body.text1,
                text2: req.body.text2,
                text3: req.body.text3,
                text4: req.body.text4,
            }
            const sql = 'UPDATE footer SET title = ?, description = ?, text1 = ? , text2 = ?, text3 = ?, text4 = ? WHERE id = ?';
            const [rows, field] = await db.query(sql, [data.title, data.description, data.text1, data.text2, data.text3, data.text4, data.id]);
            return res.json({ success: true, list: rows });
        } catch (error) {
            return res.json({ success: false, message: error });
        }
    },
}
module.exports = footerController;