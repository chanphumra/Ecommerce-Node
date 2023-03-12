const db = require("../config/database");

const cartController = {
    create: async (req, res) => {
        try {
            var sqlInsert = "INSERT INTO cart (cus_id) VALUES (?)";
            const [row, col] = await db.query(sqlInsert, [req.body.cus_id]);
            res.json({
                success: true,
                message: row
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const [row, col] = await db.query("SELECT * FROM cart");
            res.json({
                success: true,
                list: row
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
    getById: async (req, res) => {
        try {
            const [row, col] = await db.query("SELECT * FROM cart WHERE id = ?", [req.params.id]);
            res.json({
                success: true,
                list: row
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            })
        }
    },
    delete: async (req, res) => {
        try {
            var sqlDelete = "DELETE FROM cart WHERE id = ? ";
            const [row, col] = await db.query(sqlDelete, [req.params.id]);
            res.json({
                success: true,
                list: row
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
}
module.exports = cartController;