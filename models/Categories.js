const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    type: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model('category',categorySchema);