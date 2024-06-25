import express from "express";
import {
	getAllDishes,
	 createDish
} from "../controllers/dishesControllers.js";


const dishesRouter = express.Router();

dishesRouter.get("/", getAllDishes);
dishesRouter.post("/", createDish);


export default dishesRouter;