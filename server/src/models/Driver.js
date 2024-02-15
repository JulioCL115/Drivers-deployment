const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.TEXT, // Puedes ajustar el tipo de datos según tus necesidades (por ejemplo, BLOB para imágenes)
      allowNull: true,
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY, // Ajusta el tipo de datos según tus necesidades
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING, // Ajusta el tipo de datos según tus necesidades
      defaultValue: "rojo",
    },
  }, {
    freezeTableName: true, // Evita la pluralización del nombre de la tabla
  });
};