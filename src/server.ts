import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./config/env";
let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://mongooesData:IfAq5QfWZlWS9NB4@cluster0.iagloem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Mongodb Conected..");

        server = app.listen(5000, () => {
            console.log("Server is listening to port 5000");
        });
    } catch (error) {
        console.log(error);
    }
};

startServer()

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection Deleted .... Server shutting down ...", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1)

});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Deleted .... Server shutting down ...", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1)

});

process.on("SIGINT", (err) => {
    console.log("SIGINT signal recived .... Server shutting down ...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1)
});
process.on("SIGTERM", (err) => {
    console.log("SIGTERM signal recived .... Server shutting down ...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1)
});



// unhandled rejection error
// Promise.reject(new Error("I am forget to catch this erorr"));
// uncaught rejection error
// throw new Error("I am forget to handle this local error");
// signal termination sigterm


