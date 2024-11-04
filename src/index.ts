import cors from "cors";
import express from "express";
import Database from "./database";
import router from "./router";

const app = express()


app.use(cors())
app.use(express.json());

router(app)


async function startServer() {
    try {
        const database = Database.getInstance();
        await database.initialize();

        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);

        });
    } catch (error) {
        console.log("error");

    }
}

startServer();