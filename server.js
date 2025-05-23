const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');

require('dotenv').config();

const PORT = process.env.PORT || 3000

app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        const url = 'http://localhost:' + PORT;
        console.log('Servidor iniciado ' + url)
    });
}).catch(err => console.error(err));

