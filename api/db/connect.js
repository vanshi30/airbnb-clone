const mongoose =require('mongoose')


const connectDb = (url) =>{
    return mongoose.connect(url).then(()=>console.log("db CONNECTED"))
}
module.exports = connectDb