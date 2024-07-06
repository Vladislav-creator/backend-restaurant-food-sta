import express from "express";
import {
	getAllCooks,
	 createCook
} from "../controllers/cooksController.js";


const cooksRouter = express.Router();

cooksRouter.get("/", getAllCooks);
cooksRouter.post("/",  createCook);


export default cooksRouter;