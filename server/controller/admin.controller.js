const db = require("../config/database");

const adminController = {
    login: async (req, res) => {
        try {
            const [row, col] = await db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [req.body.email, req.body.password]);
            if(row.length > 0) return res.json({success: true, admin: row});
            return res.json({success: false, message: 'incorrect email or password'});
        } catch (error) {
            res.json({success: false, message: error});
        }
    }
}

module.exports = adminController;