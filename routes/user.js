import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import fetch from 'node-fetch';
import passwordGenerator from 'generate-otp'

import { addotp, deleteotp, getuser,genPassword, adduser,addtempuser, getuserfromdb, gettempuser, deletetempuser} from "../helper.js";

const router = express.Router();

router.post("/sendotp/:number",async(request,response)=>{
    
    //get phone number from request
    const {number} = request.params
    //check if previous otp request sent from db and delete it
    const userfromdb =await getuser(number)
    if(userfromdb){
        await deleteotp(number)
    }

    //generate random OTP and add hashed OTP to DB
    const otp =passwordGenerator.generate(6) ;
    const hashedotp = await genPassword(otp)

    await  addotp({number:number,otp:hashedotp})

    //send SMS(with OTP) to number using FAST2SMS (limitation in number of characters that can be sent)
    fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_AUTH}&variables_values=${otp} from FOR LOVE OF FOOD&route=otp&numbers=${number}`,{
        method:"GET"
    })
    .then((data)=>data.json())
    .then((result)=>{
            result.user=number;
            response.send(result)
    })
})

//login or check otp
router.post("/checkotp/:number",async(request,response)=>{
    //get number and otp
    const {number} = request.params
    const otp = request.body.otp;

    const user  = await getuser(number);

    //check if user has requested otp
    if(user){
        //check if otps match
        const isPasswordmatch = await bcrypt.compare(otp,user.otp);
        //if matched then create and send token to user
        if(isPasswordmatch){
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY);
            await deleteotp(number)
            response.send({message:"Success",token:token})
        }else{
            response.status('401').send({message:"Invalid OTP. Please check and try again."})
        }
    }else{
        response.status('400').send({message:"Some Error Occured. Please try again."})
    }

})


//get user info and add it to tempuser DB.Once number is confirmed move to user DB
router.post("/signup",async(request,response)=>{
    const user = request.body;

    const userfromdb = await getuserfromdb(user.number);

    //check if user already exists
    if(userfromdb){
        response.status("400").send({message:"User with this number already exists"})
    }else{
        //check if user is a unconfirmed user
        const tempuser = await gettempuser(user.number)
        //if so delete existing and add new temp user
        if(tempuser){
            await deletetempuser(user.number);
        }
     const result = await addtempuser(user);
    result.number=user.number;
    response.send(result)
        

    }
})



export const userRouter = router;
