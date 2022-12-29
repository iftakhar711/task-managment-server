const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

//D9E5vdQpNBwvK75z

const uri = `mongodb+srv://taskmaster:D9E5vdQpNBwvK75z@cluster0.p41fucv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const tasksCollection = client.db('task-collection').collection('added-task')
        // const productsCollection = client.db('used-products').collection('products')


        app.post('/tasks', async (req, res) => {
            const tasks = req.body;
            const query = {
                taskname: tasks.taskname,
                taskdetails: tasks.taskdetails,
                image: tasks.image,

            }
            const result = await tasksCollection.insertOne(query);
            res.send(result);
        });

        app.get('/tasks', async (req, res) => {
            const query = {}
            const task = await tasksCollection.find(query).toArray()
            res.send(task)
        })

        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await tasksCollection.deleteOne(filter);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})