const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User modelini import edin

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        console.log('GET /api/users - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('GET /api/users - 500 Server error');
    }
});

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
            console.log('GET /api/users/:id - 404 User not found');
        }
        res.status(200).json(user);
        console.log('GET /api/users/:id - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('GET /api/users/:id - 500 Server error');
    }
});

// Create a new user
router.post("/", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
        console.log('POST /api/users - 201 Created');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('POST /api/users - 500 Server error');
    }
});

// Update user by ID
router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found");
            console.log('PUT /api/users/:id - 404 User not found');
        }

        res.status(200).json(updatedUser);
        console.log('PUT /api/users/:id - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
        console.log('PUT /api/users/:id - 500 Server error');
    }
});

// Delete user by ID
// router.delete("/:id", async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const deletedUser = await User.findByIdAndDelete(userId);

//         if (!deletedUser) {
//             return res.status(404).send("User not found");
//             console.log('DELETE /api/users/:id - 404 User not found');
//         }

//         res.status(200).json({ message: "User deleted successfully" });
//         console.log('DELETE /api/users/:id - 200 OK');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred");
//         console.log('DELETE /api/users/:id - 500 Server error');
//     }
// });

// Delete user by email
router.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).send("User not found");
            console.log('DELETE /api/users/:email - 404 User not found');
        }

        res.status(200).json({ message: "User deleted successfully" });
        console.log('DELETE /api/users/:email - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
        console.log('DELETE /api/users/:email - 500 Server error');
    }
});

module.exports = router;
