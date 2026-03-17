import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/api/health", (req, res) => {
    const rootDir = "/var/task";
    const files: string[] = [];

    function walk(dir: string, depth = 0) {
        if (depth > 2) return;
        try {
            const list = fs.readdirSync(dir);
            for (const file of list) {
                const fullPath = path.join(dir, file);
                const stats = fs.statSync(fullPath);
                if (stats.isDirectory()) {
                    files.push(`D: ${fullPath}`);
                    walk(fullPath, depth + 1);
                } else {
                    files.push(`F: ${fullPath}`);
                }
            }
        } catch (err: any) {
            files.push(`E: ${dir} - ${err.message}`);
        }
    }

    walk(rootDir);

    res.json({
        status: "file-system-check",
        rootDir,
        files
    });
});

export default app;
