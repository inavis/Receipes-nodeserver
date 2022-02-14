import express from "express";
import { getAllReceipes,addReceipe, getReceipeById, deleteReceipe, updateReceipeById } from "../helper.js";


const router = express.Router();

router.get("/",async(request,response)=>{
    let result = await getAllReceipes();
    response.send(result);
})

router.post("/",async(request,response)=>{
    let receipe = request.body;
    let result = await addReceipe(receipe);
    response.send(result);
})

router.get("/:id",async(request,response)=>{
    let {id} = request.params;
    let result = await getReceipeById(id);
    response.send(result);
})

router.delete("/:id",async(request,response)=>{
    let {id} = request.params;
    let result = await deleteReceipe(id);
    response.send(result);
})

router.patch("/:id",async(request,response)=>{
    let {id} = request.params;
    const updatedreceipe = request.body;
    let result = await updateReceipeById(id,updatedreceipe);
    response.send(result);
})




export const receipeRouter = router;
