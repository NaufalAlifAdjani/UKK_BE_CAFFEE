const detail = require("../models/detail_transaksi");

// memanggil file model untuk transaksi
let modelTransaksi = require("../models/index").transaksi;
let modelDetail = require("../models/index").detail_transaksi;
let modelMenu = require("../models/index").menu;

exports.getAlltransaksi = async (request, response) => {
    try{
        let transaksi = await modelTransaksi.findAll()
        return response.json({
        success: true,
        data: transaksi,
        message: `semua data sukses ditampilkan sesuai yang anda minta tuan`
    })
    
    }catch{
      response.send("err")  
    } 
}

// exports.findPemesanan = async (request, response) => {
//     let status = request.body.status;
//     let pemesanans = await transaksiModel.findAll({
//       where: {
//         [Op.or]: [
//           { status: { [Op.substring]: status } },
//         ],
//       },
//     });
//     return response.json({
//       success: true,
//       data: pemesanans,
//       message: "All rooms have been loaded",
//     });
// }

exports.addTransaksi = (request, response) => {
  // tampung data request
  let newTransaksi = {
    tgl_transaksi: Date(),
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    status: request.body.status,
  };

  // insert transaksi
  modelTransaksi.create(newTransaksi).then((result) => {
      let detail = request.body.detail;
      // asumsinya detail bertipe array
      let id = result.id_transaksi;
      for (let i = 0; i < detail.length; i++) {
        //mengambil harga menu
        let menu = modelMenu.findOne ({
            where: {id_menu: request.body.detail[i].id_menu}
        });

        detail[i].id_transaksi = id;
        detail[i].id_menu = request.body.detail[i].id_menu;
      }

      // insert ke tabel detail
      modelDetail.bulkCreate(detail).then((result) => {
          return response.json({
            message: `Data Transaksi telah ditambahkan`,
          });
        })
        .catch((error) => {
          return response.json({
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

  
// exports.updatePemesanan = async (request, response) => {

//     let id = request.params.id
//     let pemesanan = {
//         nomor_pemesanan: request.body.nomor_pemesanan,
//         nama_pemesan: request.body.nama_pemesan,
//         email_pemesan: request.body.email_pemesan,
//         tgl_pemesan: request.body.tgl_pemesan,
//         tgl_check_in: request.body.check_in,
//         tgl_check_out: request.body.tgl_check_out,
//         nama_tamu: request.body.nama_tamu,
//         jumlah_kamar: request.body.jumlah_kamar,
//         tipeKamarId: request.body.tipeKamarId,
//         status_pemesanan: request.body.status_pemesanan,
//         id_user: request.body.id_user,
//     }
//     transaksiModel.update(pemesanan, { where: { id: id } })
//         .then(result => {
//             return response.json({
//                 success: true,
//                 message: `Data terupdate`
//             })
//         })
//         .catch(error => {
//             return response.json({
//                 success: false,
//                 message: 'gabisa'
//             })
//         })
// }


// exports.deletePemesanan = async (request, response) => {
//     let id = request.params.id

//     transaksiModel.destroy({ where: { id: id } })
//         .then(result => {
//             return response.json({
//                 success: true,
//                 message: `Data tipe pemesanan has been deleted`
//             })
//         })
//         .catch(error => {
//             return response.json({
//                 success: false,
//                 message: error.message
//             })
//         })
// }