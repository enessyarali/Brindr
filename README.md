# Brindr Dating and Breed Matching Application for Cats 


Tech Stack 
    Frontend : HTML,CSS,Javascript,Vuejs
    Backend : MongoDB,Nodejs,Express.js
    
FRONTEND

BACKEND

  -ENDPOINTS
  
  -POST '/signup' : Receives email and password in the req.body and hashes the password.Checks if the user exists if not adds the user to the DB.Creates a token for 24 hours and sends it back with the user data and 201 message.
  
  -POST '/login' : Receives email and password in the req.body.Checks if the user exists and checks if the password is correct with bcrypt.Returns logintoken with user data with 201 message
  
  -GET  '/preferredusers' : Gets the gender of the user and preferred breeds in the req.query.Checks the database for parameters and returns the users matching those parameters.
  
  -PUT  '/user' : Recieces formdata in req.body and updates the userdata for the given user_id.
  
  -GET  '/user' : Returns the user data for the given user_id in the req.query.Returns only one user.
  
  -PUT '/addmatch' : Receives user_id and matchedUserId from req.body.Adds the matchedUserId to the matches array of the given user_id.
  
  -GET '/users' : Receives the userIds array in the req.body .Returns the datas of the matched users in the array.
  
  -GET 'messages' : Receives userId and correspondingUserId in req.query.Returns the messages that userId sent to corresponding userId.
  
  -POST '/messages' : Receives message object from req.body. Adds it into the messages collection in the database.
  
  
