const mongoose = require("mongoose");

module.exports = () => {
    try {
        mongoose.connect(process.env.DB)
            .then(() => {
                console.log("Connected to database successfully");
            })
            .catch((error) => {
                console.log("Could not connect to database!");
                console.error(error);
            });
    } catch (error) {
        console.log("An unexpected error occurred!");
        console.error(error);
    }
};
