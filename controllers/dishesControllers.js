import { Dish } from "../db/models/dishModel.js";

export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};