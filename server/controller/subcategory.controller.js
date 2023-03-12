const db = require('../config/database');
const fs = require('fs');
const { update } = require('./maincategory.controller');


const subcategoryController = {
    create: async (req, res) => {
        try {
            const data = {
                main_id: req.body.main_id,
                name: req.body.name,
                description: req.body.description,
                image: ''
            }
            if (req.file) data['image'] = `http://${req.headers.host}/uploads/category/${req.file.filename}`;

            const sql = 'INSERT INTO sub_category (main_id,name, description, image) VALUES(?,?,?,?)';
            const [rows, fields] = await db.query(sql, [data.main_id, data.name, data.description, data.image]);
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
            const [rows, fields] = await db.query('Select * From sub_category');
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
            const { id } = req.params
            const [rows, fields] = await db.query('Select * From sub_category WHERE id = ?', [id]);
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

    getAllByMain: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await db.query('Select * From sub_category WHERE main_id = ?', [id]);
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
            const main_id = req.params.id;
            const [rows, fields] = await db.query('SELECT COUNT(main_id) AS count FROM sub_category WHERE main_id = ?', [main_id]);
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
            const [rows1, fields1] = await db.query('SELECT image FROM sub_category WHERE id = ?', [id]);
            const path = rows1[0].image.replace(`http://${req.headers.host}`, '.');
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
            // delete from databse
            const [rows2, field2] = await db.query('DELETE FROM sub_category WHERE id = ?', [id]);
            res.json({
                success: true,
                list: rows2,
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
                main_id: req.body.main_id,
                name: req.body.name,
                description: req.body.description,
                image: '',
            }

            if (req.file) {
                data['image'] = `http://${req.headers.host}/uploads/category/${req.file.filename}`;
                // delete old image 
                const [rows1, cols1] = await db.query('SELECT image FROM sub_category WHERE id = ?', [data.id]);
                const path = rows1[0].image.replace(`http://${req.headers.host}`, '.');
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
                // update sub_category
                const sql = 'UPDATE sub_category SET main_id = ?, name = ?, description = ?, image = ? WHERE id = ?';
                const [rows2, cols2] = await db.query(sql, [data.main_id, data.name, data.description, data.image, data.id]);
                res.json({
                    success: true,
                    list: rows2
                });
            }
            else {
                const sql = 'UPDATE sub_category SET main_id = ?, name = ?, description = ? WHERE id = ?';
                const [rows, cols] = await db.query(sql, [data.main_id, data.name, data.description, data.id]);
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
};

module.exports = subcategoryController;