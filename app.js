const express       = require('express');
const bodyParser    = require('body-parser');
const { ObjectID }  = require('mongojs')
const mongoose      = require('mongoose');
const path          = require('path');

const Goal          = require('./models/goals')





app.listen(3333, () => {
    console.log('app is runing on port 3333.');
})