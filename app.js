const express = require('express');
const path = require('path');
const app = express();
const productRouterV1 = require('./app/product/routes');
const { getUsers } = require('./app/product/routes');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1', productRouterV1);

app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await getUsers();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(500).json({ status: "failed", message: "Gagal mengambil data users" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: "failed",
        message: `Resource ` + req.originalUrl + `Not Found`
    });
});


// console.log(typeof getUsers);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});