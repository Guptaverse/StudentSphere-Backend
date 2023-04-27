const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

const connectDB = require('./db/mongo');
const router = require('./routes/subject.route');

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())
app.use(
    fileUpload({
        safeFileNames: true,
        preserveExtension: 5,
    })
);

connectDB();

app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK')
})

app.use('/subjects', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
