import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import  dishesRouter  from "./routes/dishesRouter.js";
import  cooksRouter  from "./routes/cooksRouter.js";
import  usersRouter  from "./routes/usersRouter.js";
dotenv.config();
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
 

 

app.use("/users", usersRouter);
app.use("/dishes", dishesRouter);
app.use("/cooks", cooksRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;