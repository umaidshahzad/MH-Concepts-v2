const mongoose = require("mongoose");
require("dotenv").config();

const DBconnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        dbName: "MH_Concepts" ,
        serverSelectionTimeoutMS:5000,
        socketTimeoutMS:45000

    })
    .then(() => { 
        console.log("DB Connection Successful to MH_Concepts");
    })
    .catch((e) => {
        console.log("Error in DB Connection", e);
        setTimeout(DBconnect,5000);
        process.exit(1);
    });
};

module.exports = DBconnect;