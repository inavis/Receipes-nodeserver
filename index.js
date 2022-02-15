import express from "express"; 
import { MongoClient } from "mongodb";
import cors from "cors";
import { receipeRouter } from "./routes/receipe.js";

//to get data from .env file
import dotenv from "dotenv";
dotenv.config();
const PORT=process.env.PORT;  //any port can be used

export const app = express();
const MONGO_URL=process.env.MONGO_URL;

//takes some time to connect so using async and await
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo DB connected");
    return client;
}
export const client = await createConnection();

//middleware
// app.use(cors(
//     {
//         origin:"http://localhost:3000",
//         methods:["PUT"]
//     }
// ))
app.use(cors())

// app.options('*', cors());
app.use(express.json())


//routes
app.use("/receipe",receipeRouter);

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     if ('OPTIONS' == req.method) {
//     res.sendStatus(200);
//     } else {
//       next();
//     }
//   });

app.get("/",(request,response)=>{
    response.send("receipes API");
});

//Need a port so that server can listen but is should not be used by some other //application
app.listen(PORT,()=>console.log("Server has started in "+PORT));
