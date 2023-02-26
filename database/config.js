const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connection made baby");
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    dbConnection
}