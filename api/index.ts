export default function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({
        status: "alive",
        type: "plain-node",
        timestamp: new Date().toISOString()
    }));
}
