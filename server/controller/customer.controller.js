const db = require("../config/database");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();

var myemail = process.env.ADMIN_EMAIL;
var mypassword = process.env.APP_PASSWORD;

function sendEmail(recipient_email, OTP) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: myemail,
                pass: mypassword,
            },
        });

        const mail_configs = {
            from: myemail,
            to: recipient_email,
            subject: "EMAIL VERIFICATION",
            html: `<!DOCTYPE html>
                    <html lang="en" >
                        <head>
                            <meta charset="UTF-8">
                            <title>BAZAAR SHOP- EMAIL VERIFICATION</title>
                        </head>
                        <body>
                            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                                <div style="margin:50px auto;width:70%;padding:20px 0">
                                    <div style="border-bottom:1px solid #eee">
                                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bazaar shop</a>
                                    </div>
                                    <p style="font-size:1.1em">Hi,</p>
                                    <p>Thank you for choosing Bazaar shop. Use the following OTP to verifycation your account.</p>
                                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                                    <p style="font-size:0.9em;">Regards,<br />Bazaar shop</p>
                                    <hr style="border:none;border-top:1px solid #eee" />
                                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                                        <p>Koding shop online</p>
                                        <p>Ecommerce in cambodia</p>
                                    </div>
                                </div>
                            </div>
                        </body>
                    </html>`,
        };

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent succesfuly" });
        });
    });
}

const customerController = {
    register: async (req, res) => {
        try {
            const data = {
                name: req.body.usernameReg,
                email: req.body.emailReg,
                password: req.body.passwordReg,
                image: ''
            }
            // check user
            const [rows, cols] = await db.query('SELECT * FROM customer WHERE email = ?', [data.email]);
            if (r.length > 0) {
                const path = `./uploads/customer/${req.file.filename}`
                if (fs.existsSync(path)) fs.unlinkSync(path)
                return res.json({ success: false, message: data.email + " already exist" })
            }
            // insert to table customer
            if (req.file) data["image"] = `http://${req.headers.host}/uploads/customer/${req.file.filename}`
            const sql = "INSERT INTO customer (name, email, password, image, verify) VALUES (?,?,?,?,?)";
            const [rows1, cols1] = await db.query(sql, [data.name, data.email, data.password, data.image, 0]);
            
            // send email
            sendEmail(data.email, req.body.OTP);

            // insert to table verify_account
            const sql2 = "INSERT INTO verify_account (cus_id, email, otp) VALUES (?,?,?)";
            const [rows2, cols2] = await db.query(sql2, [rows1.insertId, data.email, req.body.OTP]);

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
    login: async (req, res) => {
        try {
            const [rows, cols] = await db.query('SELECT * FROM customer WHERE email = ? and password = ?', [req.body.email, req.body.password]);
            if (rows.length > 0) {
                const user = rows[0];
                const access_token = jwt.sign(user, process.env.JWT_SECRET_KEY);
                return res.json({ user, access_token, success: true });
            }
            else {
                res.json({ success: false });
            }
        } catch (error) {
            res.json({
                error: true,
                message: error
            })
        }
    },
    check: async (req, res) => {
        res.json({ user: req.user });
    },
    getAll: async (req, res) => {
        try {
            const [rows, cols] = await db.query("SELECT * FROM customer ORDER BY last_chat DESC");
            res.json({
                success: true,
                list: rows
            })
        } catch (error) {
            res.json({
                error: true,
                message: error
            })
        }
    },
    getByID: async (req, res) => {
        try {
            const [rows, cols] = await db.query("SELECT * FROM customer WHERE id = ?", [req.params.id]);
            res.json({
                success: true,
                list: rows
            })
        } catch (error) {
            res.json({
                error: true,
                message: error
            })
        }
    },
    getByEmail: async (req, res) => {
        try {
            const [rows, cols] = await db.query("SELECT * FROM customer WHERE email = ?", [req.params.email]);
            res.json({
                success: true,
                user: rows
            })
        } catch (error) {
            res.json({
                error: true,
                message: error
            })
        }
    },
    getVerify: async (req, res) => {
        try {
            const [rows, cols] = await db.query('SELECT * FROM verify_account WHERE email = ? ', [req.params.email]);
            res.json({
                success: true,
                list: rows
            });
        } catch (error) {
            res.json({
                error: true,
            });
        }
    },
    delete: async (req, res) => {
        try {
            // delete old image
            const [rows1, cols1] = await db.query('SELECT image FROM customer WHERE id = ?', [req.params.id]);
            const path = rows1[0].image.replace(`http://${req.headers.host}`, '.')
            if (fs.existsSync(path)) fs.unlinkSync(path)

            // delete database
            const [row2, cols2] = await db.query("DELETE FROM customer WHERE id = ?", [req.params.id]);
            res.json({
                success: true,
                list: row2
            });
        } catch (error) {
            res.json({
                error: true,
                message: error
            });
        }
    },
    deleleSuccess: async (req, res) => {
        try {
            const [row, col] = await db.query('DELETE FROM verify_account WHERE email = ?', [req.params.email]);
            res.json({
                success: true,
                list: row
            });
        } catch (error) {
            res.json({
                error: true,
            });
        }
        console.log(req.params.emailReg);
    },
    deleteNotVerify: async (req, res) => {
        try {
            // delete old image
            const [rows1, cols1] = await db.query('SELECT image FROM customer WHERE verify = 0');
            const path = rows1[0].image.replace(`http://${req.headers.host}`, '.')
            if (fs.existsSync(path)) fs.unlinkSync(path)

            // delete database
            const [rows2, cols2] = await db.query('DELETE FROM customer WHERE verify = 0');
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
    update: async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                image: ''
            }
            var sql = '';
            if (req.file) {
                data["image"] = `http://${req.headers.host}/uploads/customer/${req.file.filename}`
                // delete old image
                const [rows1, cols1] = await db.query('SELECT image FROM customer WHERE id = ?', [req.params.id]);
                const path = rows1[0].image.replace(`http://${req.headers.host}`, '.')
                if (fs.existsSync(path))
                    fs.unlinkSync(path)
                // update customer
                sql = "UPDATE customer SET name = ?, email = ?, password = ?, image = ? WHERE id = ?";
                const [row2, cols2] = await db.query(sql, [data.name, data.email, data.password, data.image, req.params.id]);
                res.json({
                    success: true,
                    list: row2
                });
            }
            else {
                sql = "UPDATE customer SET name = ?, email = ?, password = ? WHERE id = ?";
                const [row, col] = await db.query(sql, [data.name, data.email, data.password, req.params.id]);
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
    updateProfile: async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                image: ''
            }
            var sql = '';
            if (req.file) {
                data["image"] = `http://${req.headers.host}/uploads/customer/${req.file.filename}`
                // delete old image
                const [rows1, cols1] = await db.query('SELECT image FROM customer WHERE id = ?', [req.params.id]);
                const path = rows1[0].image.replace(`http://${req.headers.host}`, '.')
                if (fs.existsSync(path))
                    fs.unlinkSync(path)
                // update customer
                sql = "UPDATE customer SET name = ?, image = ? WHERE id = ?";
                const [row2, cols2] = await db.query(sql, [data.name, data.image, req.params.id]);
                res.json({
                    success: true,
                    list: row2
                });
            }
            else {
                sql = "UPDATE customer SET name = ? WHERE id = ?";
                const [row, col] = await db.query(sql, [data.name, req.params.id]);
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
    updatePassword: async (req, res) => {
        try {
            const data = {
                password: req.body.password
            }
            const sql = "UPDATE customer SET password = ? WHERE id = ?";
            const [row, col] = await db.query(sql, [data.password, req.params.id]);
            res.json({
                success: true,
                list: row
            });
        } catch (error) {
            res.json({
                success: false,
                message: error
            });
        }
    },
    updateVerify: async (req, res) => {
        try {
            const [rows, cols] = await db.query('UPDATE customer SET verify = ? WHERE email = ?', [req.body.verify, req.body.emailReg]);
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
    resendVerify: async (req, res) => {
        try {
            // send email
            sendEmail(req.body.email, req.body.OTP);

            // get customer id
            const [rows1, cols1] = await db.query('SELECT id FROM customer WHERE email = ?', [req.body.email]);
            if (rows1.length <= 0) return res.json({ success: false, message: 'account not exist' });

            // insert to table verify_account
            const sql2 = "INSERT INTO verify_account (cus_id, email, otp) VALUES (?,?,?)";
            const [rows2, cols2] = await db.query(sql2, [rows1[0].id, req.body.email, req.body.OTP]);
            return res.json({ success: true, message: 'OTP code send to your email : ' + req.body.email });
        } catch (error) {
            return res.json({ success: false, message: error });
        }
    },
}

module.exports = customerController;