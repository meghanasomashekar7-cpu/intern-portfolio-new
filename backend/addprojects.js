require("dotenv").config();

const mongoose = require("mongoose");
const Project = require("./models/Project.js");

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {

        console.log("MongoDB connected!");

        await Project.deleteMany({});

        await Project.insertMany([
            {
                title: "AI Resume Analyzer",
                description: "A web-based project that analyzes resumes and provides suggestions to improve them.",
                technology: "Python, AI, Web"
            },
            {
                title: "Online Shopping App",
                description: "An online shopping application designed to provide a simple and user-friendly shopping experience.",
                technology: "Java, SQL"
            },
            {
                title: "Smart City Project",
                description: "A futuristic smart city concept using technology to improve transportation, safety and sustainability.",
                technology: "IoT, AI, Smart City"
            }
        ]);

        console.log("3 projects added successfully!");

        await mongoose.connection.close();
    })
    .catch((error) => {
        console.log("Error:", error);
    });