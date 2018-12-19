require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession.js')
const swagCtrl = require('./controllers/swag_controller.js')
const authCtrl = require('./controllers/auth_controller.js')
const cartCtrl = require('./controllers/cart_controller.js')


const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkForSession)

//endpoints
//swag
app.get('/api/swag', swagCtrl.read);
//auth
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

//cart
app.post('/api/cart', cartCtrl.add)
app.post('/api/cart/checkout', cartCtrl.checkout)
app.delete('/api/cart', cartCtrl.remove)

app.listen(SERVER_PORT, console.log(`Server listening on port ${SERVER_PORT}`))