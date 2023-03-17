const Product = require("../models/product");
const Image = require("../models/image");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
//storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
}).single("name");

const addNewImageProduct = async (req, res) => {
  console.log(req.body)
  upload(req, res, (err) => {
    if (err) console.log(err);
    else {
      const newImage = new Image({
        name:req.body.name,
        image: {
          data:req.file.filename,
          contentType:'image/png'
        }
      })
      newImage.save().then(res.send('success'))
    }
  });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!Product) res.status(401).send("There is no Product");
  res.send(products);
};

const addProduct = async (req, res) => {
  console.log(req?.body+"here");
  if (
    !req?.body?.productLabel ||
    !req?.body?.productDescription ||
    !req?.body?.productReference ||
    !req?.body?.productSellingPrice ||
    !req?.body?.productPurschasePrice ||
    !req?.body?.productQte
    // ||
    // !req?.body?.productImages
  )
    return res.status(400).send("product must have all attribute ");
    const imageResult = await Image.find({}).exec();
  try {
    const newProduct = {
      productLabel: req.body.productLabel,
      productDescription: req.body.productDescription,
      productReference: req.body.productReference,
      productSellingPrice: req.body.productSellingPrice,
      productPurschasePrice: req.body.productPurschasePrice,
      productQte: req.body.productQte,
      // productImages: req.body.productImages,
      productImages:imageResult,
    };
    const result = await Product.create(newProduct);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).send("product must respect schema ");
  const productDB = await Product.findOne({ _id: req.body._id }).exec();
  if (!productDB) return res.status(201).send("no product match this id ");
  if (req.body.productLabel) productDB.productLabel = req.body.productLabel;
  if (req.body.productDescription)
    productDB.productDescription = req.body.productDescription;
  if (req.body.productReference)
    productDB.productReference = req.body.productReference;
  if (req.body.productSellingPrice)
    productDB.productSellingPrice = req.body.productSellingPrice;
  if (req.body.productPurschasePrice)
    productDB.productPurschasePrice = req.body.productPurschasePrice;
  if (req.body.productQte) productDB.productQte = req.body.productQte;
  if (req.body.productImages) productDB.productImages = req.body.productImages;
  const result = await productDB.save();
  res.status(201).json(result);
};

const deleteProduct = async (req, res) => {
  if (!req?.params?.id) return res.status(400).send("we must have an id ");
  const productDB = await Product.findOne({ _id: req.params.id });
  if (!productDB) return res.status(201).send("no product match this id ");
  const result = await productDB.deleteOne({ _id: req.params.id });
  res.status(201).send("deleted");
};
module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addNewImageProduct
};
