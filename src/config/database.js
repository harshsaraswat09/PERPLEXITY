import mongoose from "mongoose";

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((err)=>{
        console.log("error connecting to DB", err)
    })
}

export default connectToDB