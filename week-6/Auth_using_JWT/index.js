const express = require('express');
const jwt = require('jsonwebtoken');
JWT_SECRET = "shubham123";
const app = express();

app.use(express.json());

let users = [];

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    console.log(users);
    

    res.json({
        Message: "you are sucessfully signed up"
    })
});

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({
            username: username,
            password: password
        },JWT_SECRET)

        res.json({
            token: token
        })

        console.log(users);


    } else {
        res.status(403).send({
            Message: "Invalid username or password"
        })
    }
});

app.get('/me',(req,res)=>{
    var decode = jwt.verify(req.headers.token,JWT_SECRET);
    const { username, password } = decode;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({
            username: user.username,
            password: user.password
        })
    } else {
        res.status(403).send({
            Message: "token invalid"
        })
    }
    
});

app.listen(3000);


// function auth(req,res,next) {
//     var decode = jwt.verify(req.headers.token,JWT_SECRET);
    
//     if (decode.username) {
//      req.username = decode.username;
//         next();
//     } else {
//         res.json({
//             message: "you are not logged in"
//         })
//     }
    
// }