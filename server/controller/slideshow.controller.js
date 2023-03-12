const db = require("../config/database");
const fs = require("fs");

const slideshowController = {
    create: async (req, res) => {
        try {
            const data = {
                title: req.body.title,
                text: req.body.text,
                link: req.body.link,
                image: '',
                enable: req.body.enable,
                orders: req.body.orders,
            }
    
            if (req.file) data["image"] = `http://${req.headers.host}/uploads/slideshow/${req.file.filename}`
            var sql = "INSERT INTO slideshow (title, text, link, image, enable, orders) VALUES (?,?,?,?,?,?)";
            const [rows, cols] = await db.query(sql, [data.title, data.text, data.link, data.image, data.enable, data.orders]);
            res.json({
                message: "Successfully inserted",
                list: rows
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
            const [rows, cols] = await db.query("SELECT * FROM slideshow");
            res.json({
                message: "Successfully get all",
                list: rows
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
            const [rows, cols] = await db.query("SELECT * FROM slideshow WHERE id = ?", [req.params.id]);
            res.json({
                message: "Successfully inserted",
                list: rows
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },

    delete: async (req, res) => {
        try {
            // delete old image
            const [rows1, cols1] = await db.query('SELECT image FROM slideshow WHERE id = ?', [req.params.id]);
            const path = rows1[0].image.replace(`http://${req.headers.host}`, '.')
            if (fs.existsSync(path)) fs.unlinkSync(path)

            // delete database
            var sqlDelete = "DELETE FROM slideshow WHERE id = ?";
            const [rows2, cols2] = await db.query(sqlDelete, [req.params.id]);
            res.json({
                message: "Successfully delete",
                list: rows2
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
    updateEnable: async (req, res) => {
        try {
            const sql = "UPDATE slideshow SET enable = ? WHERE id = ?";
            const [rows, cols] = await db.query(sql, [req.body.enable, req.params.id]);
            res.json({
                success: true,
                list: rows
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
            const data = {
                title: req.body.title,
                text: req.body.text,
                link: req.body.link,
                image: '',
                enable: req.body.enable,
                orders: req.body.orders,
            }
            var sql = '';
            if (req.file) {
                // delete old image from local pc
                data["image"] = `http://${req.headers.host}/uploads/slideshow/${req.file.filename}`
                const [rows1, cols1] = await db.query('SELECT image FROM slideshow WHERE id = ?', [req.params.id]);
                const path = rows1[0].image.replace(`http://${req.headers.host}`, '.')
                if (fs.existsSync(path))
                    fs.unlinkSync(path)

                sql = "UPDATE slideshow SET title = ?, text = ?, link = ? , image = ?, enable = ? WHERE id = ?";
                const [rows2, cols2] = await db.query(sql, [data.title, data.text, data.link, data.image, data.enable, req.params.id]);
                res.json({
                    success: true,
                    list: rows2
                });
            }
            else {
                sql = "UPDATE slideshow SET title = ?, text = ?, link = ?, enable = ? WHERE id = ?";
                const [row, col] = await db.query(sql, [data.title, data.text, data.link, data.enable, req.params.id]);
                res.json({
                    success: true,
                    list: row
                });
            }
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
}

module.exports = slideshowController;