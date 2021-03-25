
const mongoose = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser')
const mhsController = require('./src/controllers/mhs')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const app = express()
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log('Success Connected');
})


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(cors())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('foto'))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/mhs', mhsController.getAll)
app.get('/mhs/:id', mhsController.getById)
app.post('/mhs', mhsController.create)
app.put('/mhs/:id', mhsController.update)
app.delete('/mhs/:id', mhsController.delete)


app.listen(4000, () => {
    console.log('Listening for 4000...');
    console.log(process.env.MONGO_URI);
})
