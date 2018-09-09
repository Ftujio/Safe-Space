const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const databaseConfig = require('./config/database');
const apiRoutes = require('./routes/api');

mongoose.connect(databaseConfig.connectionString, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${databaseConfig.connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
