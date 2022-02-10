import { app, client } from "./index.js";


export async function getAllReceipes(){
    return await client.db("receipe_app").collection("receipes").find({}).toArray();
}

export async function addReceipe(receipe){
    return await client.db("receipe_app").collection("receipes").insertOne(receipe);
}