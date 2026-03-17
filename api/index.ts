import express from "express";
const app = express();

app.get("/api/health", (req, res) => {
    res.json({
        status: "express-alive",
        timestamp: new Date().toISOString(),
        databaseConfigured: !!process.env.DATABASE_URL
    });
});

export default app;
