import  connectDb  from "./db/connectDb.js";
import app from "./app.js";
const PORT = process.env.PORT || 8000;
import dotenv from "dotenv";
dotenv.config()
const  startServer = async () => {
    try{
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running. Use our API on port: ${PORT}`);
          });
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

startServer();