const express = require("express");
const app = express();
const cors = require("cors");
const port = process.eventNames.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//MIddleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ftp3h.mongodb.net/?retryWrites=true&w=majority`;
// const uri =
//     "mongodb+srv://task-manager:NNkHhzJimZ8AEYmM@cluster0.ftp3h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const taskCollection = client
            .db("task-list-manager")
            .collection("task-lists");

        app.get("/task", async (req, res) => {
            const list = await await taskCollection.find({}).toArray();
            res.send(list);
        });

        // Insert task
        app.post("/task", async (req, res) => {
            const data = req.body;
            const list = await taskCollection.insertOne(data);
            res.send({ message: "Task Added successfully" });
        });

        // Task Update
        app.put("/edit/:id", async (req, res) => {
            const { id } = req.params;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set: data,
            };
            const task = await taskCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send({ message: "Task Updated successfully" });
        });
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Welcome to our Add-to-Task App");
});

app.listen(port, () => {
    console.log(`Running server is ${port}`);
});
