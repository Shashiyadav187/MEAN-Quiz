# MEAN-Quiz
Quiz game created using MEAN stack. 

See a live demo here: **http://mean-quiz.herokuapp.com/**

*Due to Heroku shutting down the app after one hour of inactivity, please allow it few seconds for wake-up first time when you open it.*

## Installation:

1. Download the repository

2. Install dependencies 

3. Create a mongo database that has two collections: `questions` and `score` (I used mongolab to do this)

4. Run mongoimport command on the file `game_data\all_countries.json` that you will find in this repository

5. Open `app.js` file from the root folder of this repo and make the connection with your database: 

  `var db = mongoskin.db(...)`

6. Create a Yahoo mail address and then use it for the "Contact us" section of the application. You need to go to `routes\index.js` and edit the Nodemailer details
