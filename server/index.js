
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://enessyarali:rJfz9qrW4DjsVHAh@cluster0.hx72oed.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const express = require("express");
const {v4 : uuidv4 } = require('uuid')
const jwt = require("jsonwebtoken")
const cors  = require("cors")
const bcrypt = require("bcrypt");
const res = require('express/lib/response');
const req = require('express/lib/request');
const { query } = require('express');
const PORT = 8000;
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req , res) => {
    res.json("Hello")
})

//SIGNING UP
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
            password : hashed_password
        }

        const newuser =  await users.insertOne(data)

        logintoken = jwt.sign(newuser,LCemail ,{expiresIn: 60 * 24}) //This token expires in 24 hours 
        
        res.status(201).json({token, userId : generatedUserId , email : LCemail})
    } catch (error) {
        console.log(error);
    }
})
//LOGGING IN
app.post("/login", async (req ,res) => {
    const {email , password} = req.body
    try {
        await client.connect();
        console.log("Conntected to mongodb");
        const database= client.db('app-data')
        const users = database.collection('users')

       const user =  await users.findOne({email})
       const passwordcheck =  await bcrypt.compare(password, user.hashed_password) // check if the password is correct 

       if(user && passwordcheck){ //check if the user exists and password is correct
            const token = jwt.sign(user , email, {expiresIn : 60 * 24}) // token expires in 24 hours,user stays logged in for 24 hours 
            res.status(201).json({token , userId :user.user_id , email: email })
       }
       res.status(400).send("Invalid info")
       
    } catch (error) {
        console.log(error);
    }
})
//GETTIN ALL OF USERS 
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
//UPDATING USER DATA 
app.put("/user" , async (req , res) => {
    const formData = req.body.formData 
    
    try {
        await client.connect()
        const database= client.db('app-data')
        const users = database.collection('users')

        const query = {userId : formData.user_id}
        const updatedDocument = {
            $set: {
                first_name  : formData.first_name,
                dob_day : formData.dob_day,
                dob_month : formData.dob_month,
                dob_year : formData.dob_year,
                show_gender : formData.show_gender,
                gender_identity : formData.gender_identity,
                gender_interests : formData.gender_interests,
                // email : formData.email  this one is either in the cookies or you get it from form data check the object structure for this
                url : formData.url,
                about : formData.about,
                matches : formData.matches
            }
        }
        const updatedUser =  await users.updateOne(query , updatedDocument)
        res.send(updatedUser)
    } catch (error) {
        console.log(error);
    }finally{
        await client.close()
    }
})

//GETTING ONE USER 
app.get("/user", async (req, res) => {
    const userId = req.query.userId;
    try {
      await client.connect();
      const database = client.db("app-data");
      const users = database.collection("users");
      const query = { user_id: userId };
      const user = await users.findOne(query);
      if (!user) {
        // If user is not found, return 404 error
        res.status(404).send("User not found");
      } else {
        // If user is found, return user data
        res.json(user);
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).send("Internal server error");
    } finally {
      await client.close();
    }
  });

app.listen(PORT , () => {console.log("server running on PORT " + PORT);})
