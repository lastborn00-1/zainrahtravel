import express from "express";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);
const app = express();

app.use(session({
    cookie: { maxAge: 86400000, secure: false },
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "zainrah_secret"
}));

app.get("/api/health", (req, res) => {
    res.json({
        status: "express-session-alive",
        timestamp: new Date().toISOString(),
        databaseConfigured: !!process.env.DATABASE_URL
    });
});

export default app;
