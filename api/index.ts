import express from "express";
const app = express();

app.get("/api/health", async (req, res) => {
    const results: any = { status: "dynamic-import-test" };

    try {
        results.zodImport = "attempting...";
        const zod = await import("zod");
        results.zodImport = "success";
        results.zodType = typeof zod.z;
    } catch (err: any) {
        results.zodImport = "failed: " + err.message;
    }

    try {
        results.schemaImport = "attempting...";
        const schema = await import("../shared/schema");
        results.schemaImport = "success";
    } catch (err: any) {
        results.schemaImport = "failed: " + err.message;
    }

    res.json(results);
});

export default app;
