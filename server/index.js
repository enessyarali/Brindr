const express = require("express")
const PORT = 8000;
const app = express()





app.get("/", (req , res) => {
    res.json("Hello")
})






app.listen(PORT , () => {console.log("server running on PORT " + PORT);})
