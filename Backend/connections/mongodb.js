const { MongoClient } = require('mongodb');

require('dotenv').config();

const client = new MongoClient(process.env.DB_PORT);
// const client = new MongoClient(process.env.MONGODB_URI);
// const dbName = 'pii-reborn';
const dbName = 'piiclone';

async function connectMongoDB() {
    try {
        await client.connect();
        console.log('Connected to the database');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to the database: ', error);
        throw error;
    }
}

module.exports = { connectMongoDB };