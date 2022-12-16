const { json } = require('express');
const express = require('express');
const path = require('path')
const app = express();
const { login, get_employees, create_user, member_login } = require('./database');
//all GET,PUSH request go here

app.use(express.static('./public'));
app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({extended: false}))

//render home page
app.get('/', (req,res)=>{
    res.render('./index.html')
})

//render login page
app.get('/login',async(req,res) => {
    res.render('./login.html')
})

//render register page
app.get('/register', (req, res) => {
    res.render('./register.html');
})

app.post('/register', async (req, res) => {
    try{
        create_user(req.body.username, req.body.password, req.body.email);
        res.redirect('/login');
    }
    catch(err){
        console.log(err)
    }
})

app.post('/login', async(req,res) => {
    try{
        const result = await member_login(req.body.username, req.body.password)
        console.log(result)
        if (result[''] == 0){
            console.log(`login successful ${req.body.username}`)
            res.redirect('/')
        }
        else{
            console.log('Username or password is incorrect')
            res.redirect('/login')
        }
    }
    catch(err){
        console.log(err)
    }
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
})


