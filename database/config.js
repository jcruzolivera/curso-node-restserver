const mongoose = require('mongoose');



const dbConnection = async()=> {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });


    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    dbConnection
}