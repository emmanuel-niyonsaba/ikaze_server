const {DataTypes} = require("sequelize")
const sequelize = require("../config/index")

const User = sequelize.define("Users",{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rpCollege:{
        type:DataTypes.ENUM,
        values:["RPTUMBA","RPKIGALI","RPKARONGI"],
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM,
        values:["USER","SECURITY","DEAN","ADMIN"],
        defaultValue:"USER"
    }
    
})


module.exports = User;