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

app.get('/goals', ( req, res ) => {
    Goal.find()
        .exec( ( err, goals ) => {
            if ( err ) {
                res.send('An error has occured!');
                return;
            }
            console.log(goals);
            res.json(goals)
        });
    
});

app.get('/goals/:id', ( req, res ) => {
    id = req.params.id;
    isValid_id = ObjectID.isValid(id);
    
    if ( !isValid_id ){
        res.status(400).send('Id is not valid.')
    }

    Goal.findOne({ _id: ObjectID(id)}, ( err, goal) => {
        if ( err ) {
            return res.send(err);
        }
        if ( !goal ) {
            return res.status(400).send('No Goal with the provided id.')
        }
        return res.json(goal)
    })
});





app.listen(3333, () => {
    console.log('app is runing on port 3333.');
})