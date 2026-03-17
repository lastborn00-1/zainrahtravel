import * as expressModule from "express";
const express = expressModule.default || expressModule;
const app = express();

app.get("/api/health", (req, res) => {
    res.json({
        status: "express-robust-alive",
        timestamp: new Date().toISOString(),
        databaseConfigured: !!process.env.DATABASE_URL
    });
});

export default app;
