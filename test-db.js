import pg from 'pg';
const { Client } = pg;

const connectionString = "postgresql://postgres:mattis-5gUmty-wimmir@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?options=project%3Drhtfxsnniojlydjvguuf&sslmode=require";

async function testConnection() {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        console.log("Connection successful!");
        const res = await client.query('SELECT NOW()');
        console.log("Server time:", res.rows[0]);
        await client.end();
    } catch (err) {
        console.error("Connection failed:", err.message);
        if (err.severity) console.error("Severity:", err.severity);
        if (err.code) console.error("Code:", err.code);
        process.exit(1);
    }
}

testConnection();
