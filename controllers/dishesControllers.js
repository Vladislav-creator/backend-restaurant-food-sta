import { Dish } from "../db/models/dishModel.js";

export const getAllDishes = async (_, res) => {
  try {
    const dishes = await Dish.find({});
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const createDish = async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};