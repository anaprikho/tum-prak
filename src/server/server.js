require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));  // parse URL-encoded bodies
app.use(bodyParser.json());  // parse JSON bodies
app.use(bodyParser.text({ type: 'text/plain' }));  // parse HTML bodies

// serve client files as static files to avoid CORS
app.use('/~ge89niz/prak/client', express.static(path.join(__dirname, '../client')));

// Use the API routes middleware
app.use('', apiRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});






