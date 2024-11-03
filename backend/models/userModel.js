const db = require('../database/config');

// Function to add a new customer
async function addCustomer(customerData) {
    const { name, email, password, role = 'Customer' } = customerData;
    const query = `INSERT INTO pref_customers (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const values = [name, email, password, role];
    await db.query(query, values);
}

// Function to fetch customer cart details
async function getCartDetails(customerId) {
    const query = `SELECT * FROM pref_cart_details WHERE customer_id = ?`;
    const [rows] = await db.query(query, [customerId]);
    return rows;
}

// Exporting functions for use in other parts of the application
module.exports = {
    addCustomer,
    getCartDetails,
    // Add other functions as needed
};
