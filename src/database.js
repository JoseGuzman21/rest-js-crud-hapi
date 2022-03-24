const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
}).then(() => console.log('Database is connect'))
    .catch((err) => console.log('Error in database,' + err));