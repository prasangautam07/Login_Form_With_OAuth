import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        await mongoose.connect(`process.env.MONGO_URI/${process.env.DATABASE_NAME}`);
        console.log('Database connected');

    }catch(err){
        console.log("Error connecting to database:", err);
    }
}