const fs = require('fs')
const path = require('path')
const Mhs = require('../models/mhs')

exports.create = (req, res) => {
    const foto = req.file.filename

    const mhs = new Mhs({ ...req.body, foto })
    mhs.save()
        .then(mhs => res.json(mhs))
        .catch(err => console.log(err))
}

exports.getAll = (req, res) => {
    Mhs.find({}).then(mhss => {
        res.json(mhss)
    })

}



exports.getById = (req, res) => {
    const id = req.params.id
    Mhs.findById(id).then(mhs => {
        res.json(mhs)
    })

}

exports.update = (req, res) => {
    const id = req.params.id
    const foto = req.file.filename

    Mhs.findByIdAndUpdate(id, { ...req.body, foto })
        .then(mhs => {
            fs.unlink(path.join(__dirname, '../..', `public/assets/images/${mhs.foto}`), err => {
                console.log(err);
            })
            res.json(mhs)
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Mhs.findByIdAndDelete(id)
        .then(mhs => {
            fs.unlink(path.join(__dirname, '../..', `public/assets/images/${mhs.foto}`), err => {
                console.log(err);
            })
            res.json(mhs)
        })

}