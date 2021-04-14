const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

async function connectDB() {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        return Promise.resolve((`${DB_URI} DB Connected`))
    } catch (error) {
        return Promise.reject(error.message);
    }
}

module.exports = connectDB
