import { getDatabase, runQuery } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth";

async function setupAdmin() {
    console.log("Setting up admin user...");

    const db = getDatabase();

    // Check if admin already exists
    const existingAdmin = db
        .prepare("SELECT id FROM admin_users WHERE email = ?")
        .get("admin@kodidela-webkraft.com");

    if (existingAdmin) {
        console.log("❌ Admin user already exists!");
        return;
    }

    // Create admin user
    const email = "admin@kodidela-webkraft.com";
    const password = "admin123"; // Change this immediately after first login!
    const hashedPassword = await hashPassword(password);

    runQuery(
        "INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)",
        [email, hashedPassword, "admin"]
    );

    console.log("✅ Admin user created successfully!");
    console.log("");
    console.log("Login credentials:");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log("");
    console.log("⚠️  IMPORTANT: Change the password immediately after first login!");
    console.log("");
    console.log("Access admin panel at: http://localhost:3000/admin/login");
}

setupAdmin().catch((error) => {
    console.error("Error setting up admin:", error);
    process.exit(1);
});
