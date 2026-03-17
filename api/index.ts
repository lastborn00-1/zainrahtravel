import express from "express";
const app = express();

app.get("/api/health", (req, res) => {
    res.json({
        status: "alive",
        timestamp: new Date().toISOString(),
        databaseConfigured: !!process.env.DATABASE_URL,
        nodeVersion: process.version
    });
});

export default app;
