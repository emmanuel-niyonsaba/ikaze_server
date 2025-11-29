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



app.use(express())
app.use(express.json())
app.use(cors())

app.use("/users",userRoutes)
app.use("/appointment", appointmentRoutes)
app.use("/health",(req,res)=>{
    return res.send("App is running fine");
})




app.listen(process.env.PORT || 5000, ()=>{

     sequelize.authenticate().then(()=>console.log("DB connected successully")).catch((error)=>console.log(error.message))
     sequelize.sync({alter: true}).then(()=>{
        console.log("Models Synced Sucessfully")
     }).catch((e)=>{
        console.log(e.message);
     })

     console.log(`APP IS RUNNING ON PORT ${process.env.PORT}`)


})


