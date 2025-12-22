const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");

const Appointments = sequelize.define(
  "Appointments",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { isDate: true },
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { isDate: true },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rpCollege: {
      type: DataTypes.ENUM("RPTUMBA", "RPKIGALI", "RPKARONGI"),
      allowNull: false,
    },

    department: {
      type: DataTypes.ENUM(
        "ADMISSIONS",
        "ACADEMICS",
        "FINANCE",
        "REGISTRAR",
        "GENERAL",
        "OTHER"
      ),
      defaultValue: "GENERAL",
    },

    // Attachments
    attachmentUrls: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    guests: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
      defaultValue: "PENDING",
    },

    // Generated APT code and check-in metadata
    aptCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    aptExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    checkedInAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    checkedInBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    

    

    // isDeleted: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },

    // deletedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  },
  {
    timestamps: true,
    paranoid: true,

    indexes: [
      { fields: ["status"] },
      { fields: ["startTime"] },
    ],

    hooks: {
      beforeCreate(appointment) {
        if (!appointment.referenceNumber) {
          const timestamp = Date.now();
          const random = Math.floor(Math.random() * 1000);
          appointment.referenceNumber = `APT-${timestamp}-${random}`;
        }
      },
    },
  }
);

Appointments.prototype.generateRef = function () {
  const id = this.id?.toString().padStart(6, "0");
  const y = new Date().getFullYear().toString().slice(-2);
  return `APT-${y}-${id}`;
};

module.exports = Appointments;
