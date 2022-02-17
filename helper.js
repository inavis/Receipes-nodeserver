import { ObjectId } from "mongodb";
import { app, client } from "./index.js";
import bcrypt from "bcrypt";


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


//USER
//Add, Get, Delete for temp users(unconfirmed account)
export async function addtempuser(user){
    return await client.db("auth").collection("tempusers").insertOne(user);
}
export async function gettempuser(number){
    return await client.db("auth").collection("tempusers").findOne({number:number});
}
export async function deletetempuser(number){
    return await client.db("auth").collection("tempusers").deleteOne({number:number});
}

//Add, Get, Delete for main user 
export async function adduser(user){
    return await client.db("auth").collection("users").insertOne(user);
}
export async function getuserfromdb(number){
    return await client.db("auth").collection("users").findOne({number:number});
}
export async function deleteuser(number){
    return await client.db("auth").collection("users").deleteOne({number:number});
}


//Add, Get, Delete OTP request 
export async function addotp(user){
    return await client.db("auth").collection("user_auth_otp").insertOne(user);
}
export async function getuser(number){
    return await client.db("auth").collection("user_auth_otp").findOne({number:number});
}
export async function deleteotp(number){
    return await client.db("auth").collection("user_auth_otp").deleteOne({number:number});
}

//general
export async function genPassword(otp){
    const salt =await bcrypt.genSalt(10);
    const hashedotp =await bcrypt.hash(otp,salt)
    console.log(otp,salt,hashedotp);
    return hashedotp
  }
