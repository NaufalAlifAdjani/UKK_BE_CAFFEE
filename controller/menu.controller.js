const modelMenu = require("../models/index").menu;
const Op = require("sequelize").Op;
const  path  = require("path");
const upload = require(`./upload-menu`).single(`gambar`);
const fs = require(`fs`);

exports.getAllMenu = async (request, response) => {
  let menu = await modelMenu.findAll();
  return response.json({
    success: true,
    data: menu,
    message: `ini adalah semua data menu`,
  });
};

exports.findMenu = async (request, response) => {
  let keyword = request.body.keyword;
  let menus = await modelMenu.findAll({
    where: {
      [Op.or]: [
        { id_menu: { [Op.substring]: keyword } },
        { nama_menu: { [Op.substring]: keyword } },
        { jenis: { [Op.substring]: keyword } },
        { harga: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: menus,
    message: `berikut data yang anda minta yang mulia`,
  });
};

exports.addMenu = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }

    if (!request.file) {
      return response.json({ message: `Nothing to Upload` });
    }

    let newMenu = {
      nama_menu: request.body.nama_menu,
      gambar: request.file.filename,
      jenis: request.body.jenis,
      deskripsi: request.body.deskripsi,
      harga: request.body.harga
    };

    modelMenu.create(newMenu)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `Menu telah ditambahkan`,
        });
      })

      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.updatemenu = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }

    let id_menu = request.params.id;

    let datamenu = {
      nama_menu: request.body.nama_menu,
      jenis: request.body.jenis,
      deskripsi: request.body.deskripsi,
      harga: request.body.harga
      
    };
    if (request.file && request.file.filename) {
      datamenu.gambar = request.file.filename;
    }

    if (request.file) {
      const selectedUser = await modelMenu.findOne({
        where: { id_menu: id_menu },
      });

      const oldFotoUser = selectedUser.gambar;

      const patchFoto = path.join(__dirname, `../foto_menu`, oldFotoUser);

      if (fs.existsSync(patchFoto)) {
        fs.unlink(patchFoto, (error) => console.log(error));
      }
      datamenu.gambar = request.file.filename;
    }

    modelMenu
      .update(datamenu, { where: { id_menu: id_menu } })
      .then((result) => {
        return response.json({
          success: true,
          message: `Data room menu has been update`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

// exports.updatemenu = async (request, response) => {
//   upload(request, response, async (err) => {
//     if (err) {
//       return response.json({ message: err });
//     }
//     let id_menu = request.params.id;
//     let dataMenu = {
//       nama_menu: request.body.nama_menu,
//       gambar: request.file.filename,
//       jenis: request.body.jenis,
//       deskripsi: request.body.deskripsi,
//       harga: request.body.harga
      
//     };
//     console.log(dataMenu);

//     if (request.file) {
//       const selectedMenu = await modelMenu.findOne({
//         where: { id_menu: id_menu },
//       });
//       const oldgambarMenu = selectedMenu.gambar;

//       const pathImage = path.join(__dirname, `/../gambar`, oldgambarMenu);
//       if (fs.existsSync(pathImage)) {
//         fs.unlink(pathImage, (error) => console.log(error));
//       }
//       dataMenu.gambar = request.file.filename;
//     }
//     modelMenu
//       .update(dataMenu, { where: { id_menu: id_menu } })
//       .then((result) => {
//         return response.json({
//           success: true,
//           message: `Data Menu has been updated`,
//         });
//       })
//       .catch((error) => {
//         return response.json({
//           success: false,
//           message: error.message,
//         });
//       });
//   });
// };

exports.deleteMenu = (request, response) => {
  let idMenu = request.params.id;
  modelMenu
    .destroy({ where: { id_menu: idMenu } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data Menu has been delete`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};