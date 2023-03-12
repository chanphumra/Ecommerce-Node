const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

const telegramController = {
    sendMessage: async = (req, res) => {
        return new Promise((resolve, reject) => {
            try {
                let TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
                let TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
    
                let data = {
                    chat_id: TELEGRAM_GROUP_ID,
                    parse_mode: "HTML",
                    text: `${req.body.text}`
                };
    
                request({
                    uri: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                    method: "POST",
                    json: data
                }, function(err, res, body) {
                    if (!err) {
                        resolve("done!");
                      ///  res.json({message: 'success'});
                    } else {
                        console.log(err);
                        reject(err);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }   
}

module.exports = telegramController;