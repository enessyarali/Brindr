
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://enessyarali:rJfz9qrW4DjsVHAh@cluster0.hx72oed.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const express = require("express")
const PORT = 8000;
const app = express()

app.get("/", (req , res) => {
    res.json("Hello")
})

app.post("/signup", (req , res) => {
    res.json("Hello")
})



app.get("/users", async (req , res) => {
    try {
        await client.connect();
        console.log("Conntected to mongodb");
        const database= client.db('app-data')
        const users = database.collection('users')
        const returnedusers = await users.find().toArray()
        res.send(returnedusers)
    } catch(error){
      console.log(error);
    }finally{
        client.close();
    }
})


app.listen(PORT , () => {console.log("server running on PORT " + PORT);})
