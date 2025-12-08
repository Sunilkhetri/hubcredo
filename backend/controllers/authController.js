const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// ---- N8N Webhook URL ----
// First use webhook-test while testing.
// After workflow goes LIVE, replace with `/webhook/`
const N8N_WEBHOOK_URL = "https://sunilkhetri.app.n8n.cloud/webhook-test/25ba14e5-9971-4b16-8868-eb23559fd968";

// Sign up function
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // ---- Send event to n8n ----
        try {
            await axios.post(N8N_WEBHOOK_URL, {
                event: "user_registered",
                email,
                username
            });

            console.log("📩 n8n email trigger sent");
        } catch (err) {
            console.log("❌ n8n webhook failed:", err.message);
        }

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
