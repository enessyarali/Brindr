
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://enessyarali:rJfz9qrW4DjsVHAh@cluster0.hx72oed.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const express = require("express");
const {v4 : uuidv4 } = require('uuid')
const jwt = require("jsonwebtoken")
const cors  = require("cors")
const bcrypt = require("bcrypt")
const PORT = 8000;
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req , res) => {
    res.json("Hello")
})

app.post("/signup", async (req , res) => {
    const {email,password} = req.body

    const generatedUserId = uuidv4();
    const hashedpassword = await bcrypt.hash(password,10)
    try {
        await client.connect()
        const database= client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})
        if(existingUser){
            return res.status(409).send("User Already exists")
        }

        const LCemail= email.toLowerCase()
        const data  = {
            user_id : generatedUserId,
            email : LCemail,
            password : hashedpassword
        }

        const newuser =  await users.insertOne(data)

        logintoken = jwt.sign(newuser,LCemail ,{expiresIn: 60 * 24}) //This token expires in 24 hours 
        
        res.status(201).json({token, userId : generatedUserId , email : LCemail})
    } catch (error) {
        console.log(error);
    }
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
