// const { request, response } = require("express")
const detailtransaksiModel = require(`../models/index`).detail_transaksi
const transaksiModel = require(`../models/index`).transaksi
const userModel = require(`../models/index`).user
const mejaModel = require(`../models/index`).meja

const Op = require(`sequelize`).Op
const Sequelize = require("sequelize");
const sequelize = new Sequelize("cafe", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

exports.getAlltransaksi = async (request, response) => {
  let transaksi = await transaksiModel.findAll();
  return response.json({
    success: true,
    data: transaksi,
    message: `ini adalah semua data transaksi`,
  })
}

// exports.addtransaksi = async (request, response) => {
//   let nomor_meja = request.body.nomor_meja;
//   let meja = await mejaModel.findOne({
//       where:{
//           [Op.and]: [{nomor_meja: {[Op.substring]: nomor_meja}}],
//       },
//       attributes: [
//           "id_meja",
//           "nomor_meja",
//           "status_meja",
//           "createdAt",
//           "updatedAt",
//         ],
//   });

//   let nama_user = request.body.nama_user;
//   let id_user = await userModel.findOne({
//       where: {
//         [Op.and]: [{ nama_user: { [Op.substring]: nama_user } }],
//       },
//     });

//     if (meja === null) {
//       return response.json({
//         success: false,
//         message: `meja yang anda inputkan tidak ada`,
//       });
//     } else if (id_user === null) {
//       return response.json({
//         success: false,
//         message: `User yang anda inputkan tidak ada`,
//       });
//     }else{
//       let newtransaksi = {
//         tgl_transaksi: Date(),
//         id_user: request.body.id_user,
//         id_meja: request.body.id_meja,
//         nama_pelanggan: request.body.nama_pelanggan,
//         status: request.body.status
  
//       };

//       let mejaCheck = await sequelize.query(
//           `SELECT * FROM transaksi WHERE id_meja = ${meja.id_meja}`
//         );
//         if (mejaCheck[0].length === 0) {
//           transaksiModel
//             .create(newtransaksi)
//             .then((result) => {
//               let id_transaksi = result.id_transaksi;
//               let detailsOftransaksi = request.body.details_of_transaksi;

//               for (let i = 0; i < detailsOftransaksi.length; i++) {
//                   detailsOftransaksi[i].id_transaksi = id_transaksi;
//                 }

//                 let newDetail = {
//                   id_transaksi: id_transaksi,
//                   id_menu: detailsOftransaksi[0].id_menu,
//                   harga: detailsOftransaksi[0].harga,
//                 };

                
//         detailOftransaksiModel.create(newDetail).then((result) => {
//           return response.json({
//             success: true,
//             message: `New transaction has been inserted`,
//           });
//         })
//         .catch((error) => {
//           return response.json({
//             success: false,
//             message: error.message,
//           });
//         });
//     })
//     .catch((error) => {
//       return response.json({
//         success: false,
//         message: error.message,
//       });
//     });
// } else {
//   return response.json({
//     success: false,
//     message: `meja yang anda pesan sudah di booking`,
//   });
// }
// }
// };
// exports.addtransaksi = async(request, response) => {
//   let newTransaksi = {
//       tgl_transaksi: new Date(),
//       id_user: request.body.id_user,
//       id_meja: request.body.id_meja,
//       nama_pelanggan: request.body.nama_pelanggan,
//       nomor_meja: request.body.nomor_meja,
//       nama_user: request.body.nama_user,
//       detail_transaksi:[
//           {id_menu: request.body.id_menu},
//           {harga: request.body.harga},
//       ],
//   };

//   // update status meja
//   await mejaModel.update({status: false}, {where:{id_meja:request.body.id_meja}});

//   // insert ke tabel 
//   transaksiModel
//   .create(newTransaksi)
//   .then(async (result) => {
//       let detail_transaksi =request.body.detail_transaksi
//       // asumsinya detail_transaksi itu bertipe array
//       let id = result.id_transaksi
//       for (let i = 0; i < detail_transaksi.length; i++) {
//           detail_transaksi[i].id_transaksi = id;
//       }

//       // insert ke tabel detail_transaksi
//       await detailtransaksiModel
//       .bulkCreate(detail_transaksi)
//       // create = insert 1 baris / 1 data
//       // bulkCreate = bisa banyak data(array)
//       .then(result => {
//           return response.json({
//               message:`Data transaksi berhasil ditambahkan`
//           });
//       })
//       .catch(error => {
//           return response.json({
//               message: error.message
//           });
//       });
//   })
//   .catch(error => {
//       return response.json({
//           message: error.message
//       });
//   });
// };

exports.addtransaksi = async(request, response) => {
  let newTransaksi = {
      tgl_transaksi: new Date(),
      id_user: request.body.id_user,
      id_meja: request.body.id_meja,
      nama_pelanggan: request.body.nama_pelanggan,
      status: `belum_bayar`,
      detail_transaksi:[
          {id_menu: request.body.id_menu},
          {harga: request.body.harga},
      ],
  };

  // update status meja
  await mejaModel.update({status: false}, {where:{id_meja:request.body.id_meja}});

  // insert ke tabel 
  transaksiModel
  .create(newTransaksi)
  .then(async (result) => {
      let detail_transaksi =request.body.detail_transaksi
      // asumsinya detail_transaksi itu bertipe array
      let id = result.id_transaksi
      for (let i = 0; i < detail_transaksi.length; i++) {
          detail_transaksi[i].id_transaksi = id;
      }

      // insert ke tabel detail_transaksi
      await detailtransaksiModel
      .bulkCreate(detail_transaksi)
      // create = insert 1 baris / 1 data
      // bulkCreate = bisa banyak data(array)
      .then(result => {
          return response.json({
              message:`Data transaksi berhasil ditambahkan`
          });
      })
      .catch(error => {
          return response.json({
              message: error.message
          });
      });
  })
  .catch(error => {
      return response.json({
          message: error.message
      });
  });
};

exports.updatetransaksi = async (request, response) => {

  let idTransaksi = request.params.id
  let transaksi = {
    tgl_transaksi: Date(),
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    status: request.body.status
  }
  transaksiModel.update(transaksi, { where: { id_transaksi: idTransaksi } })
      .then(result => {
          return response.json({
              success: true,
              message: `Data terupdate`,
              data: result
          })
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message,
          })
      })
}


exports.deletetransaksi = async (request, response) => {
  let idtransaksi = request.params.id

  transaksiModel.destroy({ where: { id_transaksi: idtransaksi } })
      .then(result => {
          return response.json({
              success: true,
              message: `Data tipe transaksi has been deleted`
          })
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message
          })
      })
}

// exports.updateStatustransaksi = async (req, res) => {
//   try {
//     const params = { id_transaksi: req.params.id_transaksi };

//     const result = await transaksiModel.findOne({ where: params });
//     if (!result) {
//       return res.status(404).json({
//         message: "Data not found!",
//       });
//     }

//     const data = {
//       status: req.body.status,
//     };

//     if (data.status === "lunas") {
//       await transaksiModel.update(data, { where: params });

//       const updateTglAccess = {
//         tgl_akses: null,
//       };
//       await detailsOfPemesananModel.update(updateTglAccess, { where: params });
//       return res.status(200).json({
//         message: "Success update status booking to check out",
//         code: 200,
//       });
//     }

//     await pemesananModel.update(data, { where: params });
//     return res.status(200).json({
//       message: "Success update status booking",
//       code: 200,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal error",
//       err: err,
//     });
//   }
// };