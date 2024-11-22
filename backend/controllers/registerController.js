const { User, Inventory, Device, sequelize } = require("../models");
const bcrypt = require("bcrypt");

async function inventoryCheck(req, res) {
  try {
    const { serial_no, secret_code } = req.body;

    const item = await Inventory.findOne({
      where: {
        serial_no: serial_no,
        secret_code: secret_code,
      },
    });
    let redirectURL = "/signup";
    if (item) {
      res.status(200).json({ redirectURL, secret_code, serial_no });
    } else {
      res.status(404).json({ error: "Invalid serial number or secret code." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function register(req, res) {
  const transaction = await sequelize.transaction();

  try {
    const {
      full_name,
      email,
      phone_number,
      company,
      password,
      confirm_password,
      serial_no,
      secret_code,
      latitude,
      longitude,
    } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    if (
      !full_name ||
      !email ||
      !phone_number ||
      !company ||
      !password ||
      !confirm_password ||
      !serial_no ||
      !secret_code
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const inventoryItem = await Inventory.findOne({
      where: { serial_no, secret_code },
    });

    if (!inventoryItem) {
      return res
        .status(404)
        .json({ error: "Invalid serial number or secret code." });
    }

    if (inventoryItem.status === "assigned") {
      return res
        .status(400)
        .json({ error: "This inventory item is already assigned." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        full_name,
        email,
        phone_number,
        company,
        password: hashedPassword,
        user_role: "customer-admin",
        address: "Enter your address",
      },
      { transaction }
    );
    
    await Inventory.update(
      { status: "assigned" },
      { where: { id: inventoryItem.id }, transaction }
    );

    const { device_type } = inventoryItem;
    const newDevice = await Device.create(
      {
        inventoryId: inventoryItem.id,
        serial_no: inventoryItem.serial_no,
        model_name: inventoryItem.model_name,
        package_id: inventoryItem.package_id,
        secret_code: inventoryItem.secret_code,
        device_type,
        latitude,
        longitude,
        customer_id: newUser.id,
        customer_name: newUser.full_name,
        company_name: newUser.company,
        assigned_SLT_admin: "ssss",
      },
      { transaction }
    );

    await transaction.commit();

    let redirectURL = "/login";
    res.status(201).json({
      message: "Registration successful. Please Login!",
      redirectURL,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error during registration:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { inventoryCheck, register };
