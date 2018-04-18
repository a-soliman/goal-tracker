const express       = require('express');
const bodyParser    = require('body-parser');
const { ObjectID }  = require('mongojs')
const mongoose      = require('mongoose');
const path          = require('path');

const Goal          = require('./models/goals')

mongoose.connect('mongodb://ahmed_soliman:123456@ds247699.mlab.com:47699/goal-tracker');
const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected successfully!');
});
const app           = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', ( req, res ) => {
    res.send('It works');
});

app.listen(3333, () => {
    console.log('app is runing on port 3333.');
})