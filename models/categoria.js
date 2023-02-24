const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        
    },
    calidad: {
        type: String,
        required: [true, 'La calidad es obligatoria']
    },
    precio: {
        type: String,
        required: [true, 'El precio es obligatorio'],
    }

   
});

module.exports = model('Categoria', CategoriaSchema)