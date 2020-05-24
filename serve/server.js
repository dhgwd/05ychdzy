"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
var USERS = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'aaa', password: '456789' }
];

app.get('/hello', function (req, resp) {
    resp.send('哈哈哈');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
})
app.get('/users/:id', function (req, resp) {

    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            console.log(user);
            resp.send([user]);
            break;
        }
    }
    resp.end();
});
app.post('/account', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.userName === req.body.userName && user.password === req.body.password) {
            founded = true;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到学生!' });
    } resp.end();
})
app.post('/user', function (req, resp) {
    // json    
    USERS.push(req.body);
    console.log(req.body);
    resp.send({ succ: true });
    resp.end();
});
app.put('/user', function (req, resp) {    // json    
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到学生!' });
    } resp.end();
});

app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到学生!' });
    } resp.end();
});


/////////////
var str = [
    { id: '01', userName: 'jwj', fs: '20' },
    { id: '02', userName: 'ych', fs: '200' }
];



app.get('/abc', function (req, resp) {
    resp.send(str);
    resp.end();
})
app.get('/abc/:id', function (req, resp) {

    console.log(req.params);
    const id = req.params.id;
    for (let user of str) {
        if (user.id === id) {
            console.log(user);
            resp.send([user]);
            break;
        }
    }
    resp.end();
});
app.post('/abc', function (req, resp) {
    // json    
    str.push(req.body);
    console.log(req.body);
    resp.send({ succ: true });
    resp.end();
});
app.put('/abc', function (req, resp) {    // json    
    let founded = false;
    for (let user of str) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.fs = req.body.fs;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到学生!' });
    } resp.end();
});

app.delete('/abc/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of str) {
        if (user.id === req.params.id) {
            str.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到学生!' });
    } resp.end();
});
//////////////



app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});
