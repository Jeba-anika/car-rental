import cors from "cors";
import express, { Request, Response } from "express";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello There! Welcome to our car rental service!");
});

export default app;
