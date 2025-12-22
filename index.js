require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sequelize = require("./config/index")
const app = express()

const User = require("./models/User")
const Appointments = require("./models/Appointment")
const userRoutes = require("./routes/user.routes")
const appointmentRoutes = require("./routes/appointment.routes")

User.hasMany(Appointments)
Appointments.belongsTo(User)



// parse urlencoded bodies and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use("/api/users",userRoutes)
app.use("/api/appointment", appointmentRoutes)
app.use("/health",(req,res)=>{
    return res.send("App is running fine");
})



// sync DB and start server (skip auto-start in test env)
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 5000, () => {
    sequelize
      .authenticate()
      .then(() => console.log("DB connected successully"))
      .catch((error) => console.log(error.message));

    sequelize
      .sync({ alter: true })
      .then(() => {
        console.log("Models Synced Sucessfully");
      })
      .catch((e) => {
        console.log(e.message);
      });

    console.log(`APP IS RUNNING ON PORT ${process.env.PORT}`);
  });
}

module.exports = app;


