const db = require('../config/database');
const fs = require('fs');

const productController = {
    create: async (req, res) => {
        try {
            const data = {
                sub_id: req.body.sub_id,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                sale_price: req.body.sale_price,
                qty: req.body.qty,
                discount: req.body.discount,
                size: req.body.size,
                color: req.body.color,
                image1: '',
                image2: '',
                image3: ''
            }
            if (req.files) {
                data['image1'] = `http://${req.headers.host}/uploads/product/${req.files[0].filename}`
                data['image2'] = `http://${req.headers.host}/uploads/product/${req.files[1].filename}`
                data['image3'] = `http://${req.headers.host}/uploads/product/${req.files[2].filename}`
            }

            // insert to table product
            const sql = 'INSERT INTO product (sub_id, name, description, price, sale_price, qty, discount, image1, image2, image3) VALUES(?,?,?,?,?,?,?,?,?,?)';
            const [rows1, cols1] = await db.query(sql, [data.sub_id, data.name, data.description, data.price, data.sale_price, data.qty, data.discount, data.image1, data.image2, data.image3])

            // insert to table product_details
            const p_id = rows1.insertId;
            const sizeArray = data.size.split("/");
            const colorArray = data.color.split("/");

            if (data.size != '') {
                sizeArray.forEach(async element => {
                    if (element != '') {
                        const sql = 'INSERT INTO product_details (p_id, size, color) VALUES (?,?,?)';
                        await db.query(sql, [p_id, element, 'none']);
                    }
                });
            }
            if (data.color != '') {
                colorArray.forEach(async element => {
                    if (element != '') {
                        const sql = 'INSERT INTO product_details (p_id, size, color) VALUES (?,?,?)';
                        await db.query(sql, [p_id, 'none', element]);
                    }
                });
            }

            if (data.color === '' && data.size === '') {
                const sql = 'INSERT INTO product_details (p_id, size, color) VALUES (?,?,?)';
                await db.query(sql, [p_id, 'none', 'none']);
            }

            res.json({
                success: true,
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
            const [rows, fields] = await db.query('SELECT * FROM product');
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

    getByID: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await db.query('SELECT * FROM product WHERE id = ?', [id]);
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

    getDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await db.query('SELECT * FROM product_details WHERE p_id = ?', [id]);
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

    getAllDetailsById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await db.query('SELECT *, p.description as p_description, m.name as main_name, s.name as sub_name, p.name as p_name FROM product_details AS pd INNER JOIN product AS p ON pd.p_id = p.id INNER JOIN sub_category AS s ON s.id = p.sub_id INNER JOIN main_category AS m ON m.id = s.main_id WHERE p.id = ?', [id]);
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

    getAllDetails: async (req, res) => {
        try {
            const [rows, fields] = await db.query('SELECT *, p.description, p.id as p_id, m.name as main_name, s.name as sub_name, p.name as p_name, p.created_at FROM product AS p INNER JOIN sub_category AS s ON s.id = p.sub_id INNER JOIN main_category AS m ON m.id = s.main_id ORDER BY p.id');
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

    getAllDetailsNewArrivale: async (req, res) => {
        try {
            const [rows, fields] = await db.query('SELECT *, p.description, p.id as p_id, m.name as main_name, s.name as sub_name, p.name as p_name FROM product AS p INNER JOIN sub_category AS s ON s.id = p.sub_id INNER JOIN main_category AS m ON m.id = s.main_id ORDER BY p.id desc limit 12');
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

    getBestDiscount: async (req, res) => {
        try {
            const [rows, fields] = await db.query('SELECT *, p.description, p.id as p_id, m.name as main_name, s.name as sub_name, p.name as p_name FROM product AS p INNER JOIN sub_category AS s ON s.id = p.sub_id INNER JOIN main_category AS m ON m.id = s.main_id WHERE p.discount > 0 ORDER BY p.discount desc limit 12');
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

    getCountSubCategory: async (req, res) => {
        try {
            const sub_id = req.params.id;
            const [rows, cols] = await db.query('SELECT COUNT(sub_id) AS count FROM product WHERE sub_id = ?', [sub_id]);
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

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            // delete old image
            const [rows1, cols1] = await db.query('SELECT image1, image2, image3 FROM product WHERE id = ?', [id]);
            const path1 = rows1[0].image1.replace(`http://${req.headers.host}`, '.');
            const path2 = rows1[0].image2.replace(`http://${req.headers.host}`, '.');
            const path3 = rows1[0].image3.replace(`http://${req.headers.host}`, '.');
            if (fs.existsSync(path1)) fs.unlinkSync(path1);
            if (fs.existsSync(path2)) fs.unlinkSync(path2);
            if (fs.existsSync(path3)) fs.unlinkSync(path3);

            // delete from database
            const [rows2, cols2] = await db.query('DELETE FROM product WHERE id = ?', [id]);
            res.json({
                success: true,
                list: rows2
            });

        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },

    deleteDetails: async (req, res) => {
        try {
            const data = {
                p_id: req.params.id,
                size: req.body.size,
                color: req.body.color
            }
            const sizeArray = data.size.split("/");
            const colorArray = data.color.split("/");

            if (data.size != '') {
                sizeArray.forEach(async element => {
                    const sql = 'DELETE FROM product_details WHERE p_id = ? AND size = ?';
                    await db.query(sql, [data.p_id, element]);
                });
            }
            if (data.color != '') {
                colorArray.forEach(async element => {
                    const sql = 'DELETE FROM product_details WHERE p_id = ? AND color = ?';
                    await db.query(sql, [data.p_id, element]);
                });
            }
            res.json({
                success: true,
                message: 'delete success'
            })
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
                id: req.params.id,
                sub_id: req.body.sub_id,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                sale_price: req.body.sale_price,
                qty: req.body.qty,
                discount: req.body.discount,
                image1: '',
                image2: '',
                image3: ''
            }
            if (req.files && req.files.length >= 3) {
                data['image1'] = `http://${req.headers.host}/uploads/product/${req.files[0].filename}`
                data['image2'] = `http://${req.headers.host}/uploads/product/${req.files[1].filename}`
                data['image3'] = `http://${req.headers.host}/uploads/product/${req.files[2].filename}`


                // delete old image
                const [rows1, cols1] = await db.query('SELECT image1, image2, image3 FROM product WHERE id = ?', [data.id]);
                const path1 = rows1[0].image1.replace(`http://${req.headers.host}`, '.');
                const path2 = rows1[0].image2.replace(`http://${req.headers.host}`, '.');
                const path3 = rows1[0].image3.replace(`http://${req.headers.host}`, '.');
                if (fs.existsSync(path1)) fs.unlinkSync(path1);
                if (fs.existsSync(path2)) fs.unlinkSync(path2);
                if (fs.existsSync(path3)) fs.unlinkSync(path3);

                // update product
                const sql1 = 'UPDATE product SET sub_id = ?, name = ?, description = ?, price = ?, sale_price = ?, qty = ?, discount = ?, image1 = ?, image2 = ?, image3 = ? WHERE id = ?';
                const [rows2, cols2] = await db.query(sql1, [data.sub_id, data.name, data.description, data.price, data.sale_price, data.qty, data.discount, data.image1, data.image2, data.image3, data.id]);
                res.json({
                    success: true,
                    list: rows2
                });
            }
            else {
                // update product
                const sql3 = 'UPDATE product SET sub_id = ?, name = ?, description = ?, price = ?, sale_price = ?, qty = ?, discount = ? WHERE id = ?';
                const [rows3, cols3] = await db.query(sql3, [data.sub_id, data.name, data.description, data.price, data.sale_price, data.qty, data.discount, data.id]);
                res.json({
                    success: true,
                    list: rows3
                });
            }
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },

    clearStock: async (req, res) => {
        try {
            const [row, col] = await db.query('SELECT qty FROM product WHERE id = ?', [req.params.id]);
            const QTY = new Number(row[0].qty) - new Number(req.body.qty);
            const [row1, col1] = await db.query('UPDATE product SET qty = ? WHERE id = ?', [QTY, req.params.id]);
            res.json({
                success: true,
                list: row1
            });
        } catch (error) {
            res.json({
                success: false,
                message: error
            });
        }
    }
}

module.exports = productController;