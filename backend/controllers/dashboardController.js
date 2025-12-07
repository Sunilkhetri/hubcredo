const User = require('../models/User');

exports.getDashboard = async (req, res) => {
    try {
        // req.user populated by middleware (id, email, etc.)
        const userId = req.user && req.user.id ? req.user.id : 'unknown';
        
        // Fetch user from DB to get username
        const user = await User.findById(userId);
        const username = user ? user.username : 'Guest';
        
        return res.status(200).json({
            message: `Welcome to the dashboard, ${username}`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};