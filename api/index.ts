import express from "express";
import { z } from "zod";

const app = express();

app.get("/api/health", (req, res) => {
    res.json({
        status: "express-zod-import-attempt",
        timestamp: new Date().toISOString(),
        zodType: typeof z
    });
});

export default app;
