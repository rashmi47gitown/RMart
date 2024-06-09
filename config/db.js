import mongoose from "mongoose";
import colors from "colors";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to mongodb database ${conn.connection.host}`.bgGreen.black
    );
  } catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
  }
};

export default connectdb;
