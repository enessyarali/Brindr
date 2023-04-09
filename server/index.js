const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://enessyarali:rJfz9qrW4DjsVHAh@cluster0.hx72oed.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const corsOptions = {
  origin: "https://imgur.com",
  allowedHeaders: ["Authorization", "Content-Type"],
};

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const req = require("express/lib/request");
const PORT = 8000;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

//SIGNING UP  !!TESTED WITH POSTMAN
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const generatedUserId = uuidv4(); //Generates unique userid for each user
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User Already exists");
    }

    const LCemail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: LCemail,
      password: hashedpassword,
    };

    const newuser = await users.insertOne(data);

    logintoken = jwt.sign(newuser, LCemail, { expiresIn: 60 * 24 }); //This token expires in 24 hours

    res
      .status(201)
      .json({ token: logintoken, userId: generatedUserId, email: LCemail });
  } catch (error) {
    console.log(error);
  }
});
//LOGGING IN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await client.connect();
    console.log("Conntected to mongodb");
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });
    const passwordcheck = await bcrypt.compare(password, user.password); // check if the password is correct
    if (user && passwordcheck) {
      //check if the user exists and password is correct
      const token = jwt.sign(user, email, { expiresIn: 60 * 24 }); // token expires in 24 hours,user stays logged in for 24 hours
      res.status(201).json({ token, userId: user.user_id, email: email });
    } else {
      res.status(400).send("Invalid info");
    }
  } catch (error) {
    console.log(error);
  }
});

//GETTIN BREED TYPES USERS //gender interest needs readjustment incoming data will be an array
// app.get("/breed-users", async (req, res) => {

//   const breed = req.query.breed;

//   try {
//     await client.connect();
//     console.log("Conntected to mongodb");
//     const database = client.db("app-data");
//     const users = database.collection("users");
//     const query = { type_interest: breed };
//     const foundUsers = await users.find(query).toArray();
//     res.send(foundUsers);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.close();
//   }
// });
app.get("/preferredusers", async (req, res) => {
  const breed = req.query.breed;
  const gender = req.query.gender;

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = {
      type_interest: { $in: breed },
      gender: gender,
    };
    const foundUsers = await users.find(query).toArray();
    res.send(foundUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

//UPDATING USER DATA
app.put("/user", async (req, res) => {
  const formData = req.body.formData; //removed .formdata for testing

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };
    const updatedDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        gender_identity: formData.gender,
        breed_type: formData.breed_type,
        breed_interest: formData.breed_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };
    const updatedUser = await users.updateOne(query, updatedDocument);
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

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
//ADDING MATCHES
app.put("/addmatch", async (req, res) => {
  //   const { userId, matdhedUserId } = req.body;
  const userId = req.body.user_id;
  const matcheduserId = req.body.matcheduserId;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updatedDocument = {
      $push: { matches: { user_id: matcheduserId } },
    };
    const user = await users.updateOne(query, updatedDocument);
    res.send(user);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});
// GET MATCHED USERS (In the query an array of matches (userIds) should be sent to this endpoint.It sends back those users as objects in an)
app.get("/users", async (req, res) => {
  const userIds = req.query.userIds ? JSON.parse(req.query.userIds) : []; //This will ensure that the query parameter correctly is correctly parsed,

  try {
    // even if no userIds parameter is passed.

    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();
    console.log(foundUsers);
    res.send(foundUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

//GETTING MESSAGE HISTORY with aggregate().A bit more complex and maybe more costly
// caution this returns the messages sent by one user to get the whole conversation make sure you
//reverse the users and get the other users messages on the frontend
app.get("/messages", async (req, res) => {
  // const { userId, correspondingUserId } = req.params;  | Decided to get the message users with query
  const userId = req.query.userId;
  const correspondingUserId = req.query.correspondingUserId;
  try {
    await client.connect();
    const database = client.db("app-data");
    const collection = database.collection("messages");
    const pipeline = [
      {
        $match: {
          from_userId: userId,
          to_userId: correspondingUserId,
        },
      },
    ];

    console.log("userId:", userId);
    console.log("correspondingUserId:", correspondingUserId);
    const messageHistory = await collection.aggregate(pipeline).toArray();
    console.log("messageHistory:", messageHistory);
    res.send(messageHistory);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

//2nd version simpler with find() method because the needed query is not really big.
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const cursor = database.collection("messages");

//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };

//     const foundMessages = await cursor.find(query).toArray();
//     res.send(foundMessages);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.close();
//   }
// });

//ADD MESSAGES
app.post("/messages", async (req, res) => {
  const message = req.body;

  //   const newmessage = {
  //     timestamp: timestamp,
  //     from_userId: from_userId,
  //     to_userId: to_userId,
  //     message: message,
  //   };  The message object will arrive with all of this info.There is no need to destructure the incoming message data in req.body.
  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const result = await messages.insertOne(message);
    console.log(result);
    res.status(201).send("Message Inserted Correctly");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close;
  }
});

app.listen(PORT, () => {
  console.log("server running on PORT " + PORT);
});
