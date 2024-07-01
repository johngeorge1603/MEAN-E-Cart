const mongoose = require('mongoose')

const connectionString = process.env.DB_CONNECTION

mongoose.connect(connectionString).then(
    (res)=>{
        console.log("MongoDB connected with server successfully.")
    }
).catch((err)=>{
    console.log(err);
})