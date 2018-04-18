const mongose   = require('mongoose')
const Schema    = mongose.Schema;

const GoalsSchema = new Schema({
    name: String,
    type: String,
    deadline: String
});

module.exports = mongose.model('Goals', GoalsSchema);
