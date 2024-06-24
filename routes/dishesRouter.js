import express from "express";
import {
	getAllDishes
} from "../controllers/dishesControllers.js";


const dishesRouter = express.Router();

dishesRouter.get("/", getAllDishes);



export default dishesRouter;