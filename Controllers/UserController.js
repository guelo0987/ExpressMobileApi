const express  = require('express');
const User = require('../Models/User');

const userRouter = express.Router();

// Get current user 
userRouter.get('/api/user/current', async (req, res) => {
    try {
        // Assuming user authentication is implemented and user ID is available in req.user
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export router
module.exports = userRouter;