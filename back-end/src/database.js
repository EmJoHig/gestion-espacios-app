import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    // const db = await mongoose.connect(MONGODB_URI);
    // console.log("Mongodb is connected to", db.connection.host);
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
  }) 
      .then(db => console.log(`DB is connected`+ 'mongodb uri: '+process.env.MONGODB_URI+ " db: "+ db))
      .catch(err => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
