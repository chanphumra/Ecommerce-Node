const db = require('../config/database');
const fs = require('fs');

const orderController = {
    create: async (req, res) => {
        try {
            const data = {
                cus_id: req.body.cus_id,
                payment_method: req.body.payment_method,
                fullname: req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                status: req.body.status,
                total: req.body.total,
            }
            const sql = 'INSERT INTO orders (cus_id, payment_method, fullname, email, phone, address, status, total) VALUES(?,?,?,?,?,?,?,?)';
            const [rows1, cols1] = await db.query(sql, [data.cus_id, data.payment_method, data.fullname, data.email, data.phone, data.address, data.status, data.total])

            res.json({
                success: true,
                order_id: rows1.insertId
            })

        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
    createOrderdetail: async (req, res) =>{
        try {
            const sql = 'INSERT INTO order_details(o_id, p_id, qty) VALUES(?,?,?)';
            const [rows, fields] = await db.query(sql,[req.body.o_id, req.body.p_id, req.body.qty]);
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

    getDetailById: async (req, res) => {
        try {
            const [rows, fields] = await db.query('SELECT o.id, o.total, c.image, c.name, o.payment_method FROM orders as o INNER JOIN customer as c WHERE o.cus_id = c.id AND c.id = ?', [req.params.cus_id]);
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

    getAllDetail: async (req, res) => {
        try {
            const [rows, fields] = await db.query('SELECT o.id, o.total, c.image, c.name, o.payment_method FROM orders as o INNER JOIN customer as c WHERE o.cus_id = c.id');
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

    getDetailByOrderId: async (req, res) => {
        try {
            const sql = 'SELECT o.cus_id, p.image1, p.name, p.sale_price, p.discount, o.total, od.qty FROM order_details as od INNER JOIN orders as o ON od.o_id = o.id INNER JOIN product as p ON od.p_id = p.id WHERE o.id = ?';
            const [row, col] = await db.query(sql, [req.params.o_id]);
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

module.exports = orderController;