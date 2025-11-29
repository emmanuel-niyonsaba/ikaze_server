const {DataTypes} = require("sequelize")
const sequelize = require("../config/index")
const Appointments=sequelize.define("Appointments",{
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    individualCode:{
        type:DataTypes.STRING,
        allowNull:false,
        
     

    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    period:{
        type: DataTypes.ENUM,
        values:["DAY","WEEK","MONTH"],
        defaultValue:"DAY"
    },

    startTime:{
        type: DataTypes.DATE
    },
    endTime:{
        type:DataTypes.DATE
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rpCollege:{
        type:DataTypes.ENUM,
        values:["RPTUMBA","RPKIGALI","RPKARONGI"],
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM,
        values:["PENDING","IN","OUT","APPROVED"],
        defaultValue:"PENDING"
    }

})

module.exports = Appointments