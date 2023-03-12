const db = require('../config/database');
const fs = require('fs');


const mainCategoryController = {

    create: async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                description: req.body.description,
                image: ''
            }
            if (req.file) data['image'] = `http://${req.headers.host}/uploads/category/${req.file.filename}`;

            const sql = 'INSERT INTO main_category (name, description, image) VALUES(?,?,?)';
            const [rows, fields] = db.query(sql, [data.name, data.description, data.image])
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

    getAll: async (req, res) => {
        try {
            const [rows, fields] = await db.query('Select * From main_category');
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

    getAllAndCountSub: async (req, res) => {
        try {
            const [rows1, fields1] = await db.query('Select * From main_category');
            
            let countSup = [];
            for (let index = 0; index < rows1.length; index++) {
                const item = rows1[index];
                const [rows2, fields2] = await db.query('Select Count(main_id) AS count From sub_category WHERE main_id = '+ item.id);
                countSup.push(rows2);
            }
            res.json({
                success: true,
                list: {
                    data : rows1,
                    counts: countSup
                }
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
            const [rows, fields] = await db.query('SELECT * FROM main_category WHERE id = ?', [id]);
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
            // delete image 
            const [rows1, fields1] = await db.query('SELECT image FROM main_category WHERE id = ?', [id]);
            const path = rows1[0].image.replace(`http://${req.headers.host}`, '.');
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
            // delete from database
            const [rows2, fields2] = await db.query('DELETE FROM main_category WHERE id = ?', [id]);
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

    update: async (req, res) => {
        try {
            const data = {
                id: req.params.id,
                name: req.body.name,
                description: req.body.description,
                image: '',
            }
            if (req.file) {
                data['image'] = `http://${req.headers.host}/uploads/category/${req.file.filename}`;
                // delete old image 
                const [rows1, field1] = await db.query('SELECT image FROM main_category WHERE id = ?', [data.id]);
                const path = rows1[0].image.replace(`http://${req.headers.host}`, '.');
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
                // update with new image
                const sql = 'UPDATE main_category SET name = ?, description = ?, image = ? WHERE id = ?';
                const [rows2, field2] = await db.query(sql, [data.name, data.description, data.image, data.id]);
                res.json({
                    success: true,
                    list: rows2
                });
            }
            else {
                const sql = 'UPDATE main_category SET name = ?, description = ? WHERE id = ?';
                const [rows, fields] = await db.query(sql, [data.name, data.description, data.id]);
                res.json({
                    success: true,
                    list: rows
                });
            }

        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    }
}

module.exports = mainCategoryController;