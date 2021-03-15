const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MhsSchema = new Schema({
    nim : String,
    nama : String,
    kelas : String,
    motto: String,
    foto : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Mhs', MhsSchema)