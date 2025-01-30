import { Request, Response } from "express";



export const roomsAndCategories = async(req:Request,res:Response):Promise<void>=>{

    const {roomNo,categories} = req.body;
    const existing
}