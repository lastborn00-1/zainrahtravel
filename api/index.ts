import express from "express";
import * as schema from "../shared/schema";

const app = express();

app.get("/api/health", (req, res) => {
    res.json({
        status: "express-schema-import-attempt",
        timestamp: new Date().toISOString(),
        schemaKeys: Object.keys(schema)
    });
});

export default app;
