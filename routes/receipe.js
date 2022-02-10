import express from "express";
import { getAllReceipes,addReceipe } from "../helper.js";

const router = express.Router();

router.get("/",async(request,response)=>{
    let result = await getAllReceipes();
    response.send(result);
})

router.post("/add",async(request,response)=>{
    let receipe = request.body;
    let result = await addReceipe(receipe);
    response.send(result);
})



export const receipeRouter = router;
