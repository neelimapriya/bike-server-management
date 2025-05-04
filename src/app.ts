import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "bike server is running......",
  });
});

app.use("/api", router);

app.use(globalErrorHandler)
app.use(notFoundHandler)

export default app;
