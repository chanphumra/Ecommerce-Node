const db = require("../config/database")


const cartdetailController = {
    create: async (req, res) => {
        try {
            var sqlInsert = "INSERT INTO cart_details (cart_id, p_id, size, color, qty, total) VALUES (?)";
            var data = [
                req.body.cart_id,
                req.body.p_id,
                req.body.size,
                req.body.color,
                req.body.qty,
                req.body.total
            ]
            const [row, col] = await db.query(sqlInsert, [data]);
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
    getAll: async (req, res) => {
        try {
            var sql = "SELECT cd.id AS id, c.id AS cart_id, p.image1 AS productImage, p.name AS productName, p.price AS price, c.cus_id AS CustomerID FROM cart_details AS cd INNER JOIN product AS p ON cd.p_id = p.id INNER JOIN cart c ON cd.cart_id = c.id WHERE c.id = ? AND c.cus_id = ?";
            const [row, col] = await db.query(sql, [req.params.id, req.params.cus_id]);
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
    getCountCartDetails: async (req, res) => {
        const [rows, cols] = await db.query("SELECT COUNT(*) AS count FROM cart_details INNER JOIN cart ON cart_details.cart_id = cart.cus_id WHERE cus_id = 9");
        res.json({
            success: true,
            
        });
    },
    getOne: async (req, res) => {
        try {
            const [row, col] = await db.query("SELECT * FROM cart_details WHERE cart_id = ?", [req.params.id]);
            res.json({
                success: true,
                list: row
            });
        } catch (error) {

        }
    },
    delete: async (req, res) => {
        try {
            var id = req.params.id;
            var cart_id = req.params.cart_id;
            var sqlDelete = "DELETE FROM cart_details WHERE id = ? and cart_id = ?";
            const [row, col] = await db.query(sqlDelete, [id, cart_id]);
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
    update: async (req, res) => {
        try {
            var sqlInsert = "UPDATE cart_details SET cart_id = ?, p_id = ?, size = ?, color = ?, qty = ?, total = ? WHERE id = ? AND cart_id = ?";
            var values = [
                req.body.cart_id,
                req.body.p_id,
                req.body.size,
                req.body.color,
                req.body.qty,
                req.body.total
            ]
            const [row, col] = await db.query(sqlInsert, [...values, req.params.id, req.params.cart_id]);
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
    }
}

module.exports = cartdetailController;
