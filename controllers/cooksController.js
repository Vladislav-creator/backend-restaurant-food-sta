import { Cook } from "../db/models/cookModel.js";

export const getAllCooks = async (_, res) => {
  try {
    const cooks = await Cook.find({}); 
    res.status(200).json(cooks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const createCook = async (req, res) => {
  try {
    const newCook = new Cook(req.body);
    await newCook.save();
    res.status(201).json(newCook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};