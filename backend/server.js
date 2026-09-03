require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Project = require("./models/Project.js");
const Message = require("./models/Message.js");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.json({
        message: "Meghana's Portfolio Backend is Running!"
    });
});

app.get("/api/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching projects"
        });
    }
});

app.post("/api/messages", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new Message({
            name: name,
            email: email,
            message: message
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message sent successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saving message"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server running on port ${PORT}`);
});