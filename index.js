const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/nonpermessi', (req, res) => {
    res.render('nonpermessi');
});

app.get('/App_GrantedUser', (req, res) => {
    res.render('App_GrantedUser');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const authenticateLogin = authenticate(username, password);

    if (authenticateLogin.success) {
        res.json({ success: true, redirectTo: '/App_GrantedUser' });
    } else {
        res.json({ success: false, redirectTo: '/nonpermessi' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function authenticate(username, password) {
    const credenziali = JSON.parse(fs.readFileSync('credenziali.json'));

    if (credenziali[username] && credenziali[username].password === password) {
        return { success: true, message: 'Login effettuato' };
    } else {
        return { success: false, message: 'Credenziali non valide' };
    }
}
