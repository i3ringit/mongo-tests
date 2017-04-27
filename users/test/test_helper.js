const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('Successfully connected to MongoDB.'))
  .on('error', (error) => {
    console.warn('Warning: ', error);
  });
