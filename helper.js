import { ObjectId } from "mongodb";
import { app, client } from "./index.js";


export async function getAllReceipes(){
    return await client.db("receipe_app").collection("receipes").find({}).toArray();
}
export async function getReceipeById(id){
    return await client.db("receipe_app").collection("receipes").findOne({_id:ObjectId(id)});
}

export async function addReceipe(receipe){
    return await client.db("receipe_app").collection("receipes").insertOne(receipe);
}
export async function deleteReceipe(id){
    return await client.db("receipe_app").collection("receipes").deleteOne({_id:ObjectId(id)});
}

export async function updateReceipeById(id,updatedreceipe){
    return await client.db("receipe_app").collection("receipes")
    .updateOne({_id:ObjectId(id)},{$set:updatedreceipe})
}
