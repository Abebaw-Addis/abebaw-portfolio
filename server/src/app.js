import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [
        "https://abebaw-portfolio.onrender.com",
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", routes);

export default app;
