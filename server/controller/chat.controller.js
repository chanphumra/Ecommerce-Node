const db = require("../config/database");

const chatController = {
    create: async (req, res) => {
        try {
            const sql = 'INSERT INTO chat(senderId, receiverId, message, chat_at, sender) VALUES (?, ?, ?, NOW(), ?)';
            const [row, col] = await db.query(sql, [req.body.senderId, req.body.receiverId, req.body.message, req.body.sender]);
            return res.json({success: true, message: 'insert message success'});
        } catch (error) {
            res.json({success: false, message: error});
        }
    },
    getMessage: async (req, res) => {
        try {
            const senderId = req.params.senderId;
            const receiverId = req.params.receiverId;
            const sql = "SELECT * FROM chat WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)";
            const [rows, cols] = await db.query(sql, [senderId, receiverId, receiverId, senderId]);
            return res.json({success: true, list: rows});
        } catch (error) {
            res.json({success: false, message: error});
        }
    } 
}

module.exports = chatController;