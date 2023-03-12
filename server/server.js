const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});
/*--------- Import Route -----------*/
const admin = require('./routes/admin.route');
const maincategory = require('./routes/maincategory.route');
const subcategory = require('./routes/subcategory.route');
const product = require('./routes/product.route');
const customer = require('./routes/customer.route');
const slideshow = require('./routes/slideshow.route');
const cart = require('./routes/cart.route');
const order = require('./routes/order.route');
const telegram = require('./routes/telegram.route');
const profilesetting = require('./routes/profilesetting.route');
const footer = require('./routes/footer.route');
const chat = require('./routes/chat.route');
const aboutus = require('./routes/aboutus.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static("uploads"));
app.use((req, res, next) => {res.setHeader("Access-Control-Allow-Origin", "*"); next();});

httpServer.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});

/*--------- Route -----------*/
app.get('/', (req, res) => { res.send('Welcome to Ecommerce Node js API') });
app.use('/api/admin', admin);
app.use('/api/maincategory', maincategory);
app.use('/api/subcategory', subcategory);
app.use('/api/product', product);
app.use('/api/customer', customer);
app.use('/api/slideshow', slideshow);
app.use('/api/cart', cart);
app.use('/api/order', order);
app.use('/api/telegram', telegram);
app.use('/api/profile', profilesetting);
app.use('/api/footer', footer);
app.use('/api/chat', chat);
app.use('/api/aboutus', aboutus);

/*--------- Implement socket io -----------*/
let users = [];

const addUser = (isAdmin, userId, sockedId) => {
    if(isAdmin === 1){
        const index = users.findIndex(user => user.isAdmin === 1);
        if(index >= 0) 
            users[index].sockedId = sockedId;
        else 
            users.push({isAdmin, userId, sockedId});
        return;
    }
    const index = users.findIndex(user => user.userId === userId);
    if(index >= 0)
        users[index].sockedId = sockedId;
    else
        users.push({isAdmin, userId, sockedId});
}

const removeUser = (sockedId) => {
    users = users.filter(user => user.sockedId !== sockedId);
}

const getUser = (userId, sender) => {
    if(sender !== 1) return users.find(user => user.isAdmin === 1) || 'none';
    return users.find(user => user.userId === userId && user.isAdmin !== 1) || 'none';
}

io.on('connection', (socket) => {
    socket.on("addUsers", data =>{
        addUser(data.isAdmin, data.userId, data.sockedId);
        console.log(users);
    })

    socket.on('send_message', data => {
        const user = getUser(data.receiverId, data.sender);
        if(user) socket.to(user.sockedId).emit('recv_message', data);
        console.log("send to " + user.userId + " and socket id : " + user.sockedId);
    })

    socket.on('disconnect', () => {
        console.log("user id: " + socket.id + " disconnect");
        removeUser(socket.id);
    })
});
