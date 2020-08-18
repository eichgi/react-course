const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlaces = require('./../models/Enlace');

exports.subirArchivo = async (req, res, next) => {
  const configMulter = {
    limits: {fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024},
    storage: fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + './../uploads')
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${shortid.generate()}${extension}`)
      },
      /*fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          return cb(null, true);
        }
      },*/
    })
  };
  const upload = multer(configMulter).single('archivo');

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.json({archivo: req.file.filename});
    } else {
      console.log(error);
      next();
    }
  });
};

exports.eliminarArchivo = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("archivo eliminado");
  } catch (error) {
    console.log(error);
  }
};

exports.descargar = async (req, res, next) => {
  const {archivo} = req.params;
  const enlace = await Enlaces.findOne({nombre: archivo});
  console.log(enlace);

  const pathfile = __dirname + '/../uploads/' + archivo;
  res.download(pathfile);

  if (enlace.descargas === 1) {

    //Delete file & link
    req.archivo = enlace.nombre_original;
    await Enlaces.findOneAndRemove(enlace.id);

    next();

  } else {
    enlace.descargas--;
    await enlace.save();
  }
}