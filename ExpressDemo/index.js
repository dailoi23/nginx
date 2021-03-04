const Joi = require('joi');
const express = require('express');
const app = express();
const db = require('./models');
const path = require('path');
app.use(express.json());
const session = require('express-session');
const bodyParser = require('body-parser');

//connect to database and start server 
db.sequelize.sync().then((req) => {

    const port = process.env.port || 3000;
    app.listen(port, () => console.log(`listening on ${port} ....`));

});

app.use(session({secret: "5826398"}));
app.use(bodyParser.urlencoded({ extended: true }));


//return mainpage 
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})



//route api 

// app.use('/api/Users', require('./routes/Users'));
// app.use('/api/testing', require('./routes/testing'));


app.use('/api/Courses', require('./routes/courses'));
app.use('/api/Login', require('./routes/login'));
app.use('/api/project', require('./routes/project'));

// const courses = [
//     { id: 1, name: 'course1' },
//     { id: 2, name: 'course2' },
//     { id: 3, name: 'course3' },
// ];

