import express from "express";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/stats";
import { adminOnly } from "../middlewares/auth";

const app = express.Router();

app.get("/stats",adminOnly,getDashboardStats);

app.get("/pie",adminOnly,getPieCharts);

app.get("/bar",adminOnly,getBarCharts);

app.get("/line",adminOnly,getLineCharts);

export default app;