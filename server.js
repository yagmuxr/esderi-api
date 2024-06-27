const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const mainRoute = require("./routes/index");
const userRoute = require("./routes/users");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

app.use(cors());
app.use(express.json());
app.use("/api", mainRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
    connect().catch(error => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    });
    console.log(`Server is running on port ${PORT}`);
});
