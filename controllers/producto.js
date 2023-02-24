// controlador para agregar un nuevo producto
const agregarProducto = (req, res) => {
    const Product = require('../models/product');

    const addProduct = (req, res) => {
      // Creamos un nuevo objeto Product utilizando los datos enviados en la solicitud
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
      });
    
      // Guardamos el nuevo producto en la base de datos
      newProduct.save()
        .then(() => {
          // Si se guardó correctamente, enviamos una respuesta HTTP con un código de estado 201 (Created)
          res.status(201).json({
            message: 'Producto creado con éxito'
          });
        })
        .catch(error => {
          // Si hubo un error al guardar el producto, enviamos una respuesta HTTP con un código de estado 500 (Internal Server Error)
          res.status(500).json({
            error: error
          });
        });
    };
    
    module.exports = {
      addProduct
    };
      }
  
  // controlador para ver todos los productos
  const verProductos = (req, res) => {
    const Product = require('../models/product');

// Controlador para recuperar un producto por su ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Controlador para actualizar un producto por su ID
const updateProductById = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

module.exports = {
  getProductById,
  updateProductById,
};

  }
  
  // controlador para ver un producto específico
  const verProducto = (req, res) => {
    const Product = require('../models/product');

// Controlador para obtener todos los productos
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({
        message: 'Productos encontrados exitosamente',
        products: products
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error al buscar productos',
        error: error
      });
    });
};

  }
  
  // controlador para editar un producto existente
  const editarProducto = (req, res) => {
    const Product = require('../models/Product');

// Controlador para editar un producto existente
const editProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, description, price, quantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  editProduct,
};

  }
  
  // controlador para ver los productos agotados
  const verProductosAgotados = (req, res) => {
    const Product = require('../models/product');

const getOutOfStockProducts = async (req, res) => {
  try {
    const outOfStockProducts = await Product.find({ stock: 0 });
    res.status(200).json(outOfStockProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getOutOfStockProducts,
};

  }
  
  // controlador para ver los productos más vendidos
  const verProductosMasVendidos = (req, res) => {
    const Product = require('../models/product');

const getTopSellingProducts = async (req, res) => {
  try {
    const topSellingProducts = await Product.find().sort({ sold: -1 }).limit(10);
    res.status(200).json(topSellingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getTopSellingProducts,
};

  }
  
  // controlador para eliminar un producto existente
  const eliminarProducto = (req, res) => {
    const Product = require('../models/product');

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { deleteProduct };

  }
  