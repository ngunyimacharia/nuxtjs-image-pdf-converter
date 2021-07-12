const app = require('express')()

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.all('/upload-images', (req, res) => {
    req.body.images
    console.log('Got body:', req.body);
    res.json({ data: 'data' })
})

module.exports = app
