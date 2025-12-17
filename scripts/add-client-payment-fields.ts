import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function addClientPaymentFields() {
    const connectionString = process.env.POSTGRES_URL?.split('?')[0];

    if (!connectionString) {
        throw new Error('POSTGRES_URL not found in environment');
    }

    const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('🔄 Adding payment tracking fields to clients table...');

        await pool.query(`
      ALTER TABLE clients
      ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10, 2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS amount_pending DECIMAL(10, 2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS payment_method TEXT,
      ADD COLUMN IF NOT EXISTS payment_notes TEXT,
      ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Pending',
      ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMP WITH TIME ZONE;
    `);

        console.log('✅ Successfully added payment tracking fields to clients table');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

addClientPaymentFields()
    .then(() => {
        console.log('✨ Migration completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
