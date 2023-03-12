const db = require("../config/database");
const fs = require('fs');

const profilesettingController = {
    get: async (req, res) => {
        try {
            const [rows, cols] = await db.query('SELECT * FROM profile_setting');
            return res.json({success: true, list: rows});
        } catch (error) {
            return res.json({success: false, message: error});
        }
    },
    update: async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                city: req.body.city,
                country: req.body.country,
                phone: req.body.phone,
                email: req.body.email,
                image: ''
            }
            if (req.file) {
                data['image'] = `http://${req.headers.host}/uploads/profile/${req.file.filename}`;
                // delete old image 
                const [rows1, field1] = await db.query('SELECT image FROM profile_setting WHERE id = 1');
                const path = rows1[0].image.replace(`http://${req.headers.host}`, '.');
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
                // update with new image
                const sql = 'UPDATE profile_setting SET name = ?, city = ?, country = ? , phone = ?, email = ?, image = ?, modified_at = NOW() WHERE id = 1';
                const [rows2, field2] = await db.query(sql, [data.name, data.city, data.country, data.phone, data.email, data.image]);
                return res.json({success: true, list: rows2});
            }
            else {
                const sql = 'UPDATE profile_setting SET name = ?, city = ?, country = ? , phone = ?, email = ? , modified_at = NOW() WHERE id = 1';
                const [rows, field] = await db.query(sql, [data.name, data.city, data.country, data.phone, data.email]);
                return res.json({success: true, list: rows});
            }
        } catch (error) {
            return res.json({success: false, message: error});
        }
    },
}
module.exports = profilesettingController;