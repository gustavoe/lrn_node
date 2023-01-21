const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

// class Cliente extends Model {}

// Cliente.init(
//    {
//        nombre: { type: DataTypes.STRING },
//        apellido: { type: DataTypes.STRING },
//        email: { type: DataTypes.STRING },
//    },
//    {
//        sequelize,
//        modelName: "cliente",
//        timestamps: false,
//    }
//);

const Cliente = sequelize.define(
    "Cliente",
    {
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "cliente",
        timestamps: false,
    }
);

module.exports = Cliente;
