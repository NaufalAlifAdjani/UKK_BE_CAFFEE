const userModel = require("../models/index").user
const Op = require("sequelize").Op
const md5 = require(`md5`)

exports.getAllUser = async (request, response) => {
  let user = await userModel.findAll();
  return response.json({
    success: true,
    data: user,
    message: `ini adalah semua data user`,
  })
}

// exports.findUser = async (request, response) => {
//   let nama_user = request.body.nama_user;
//   let username = request.body.username;
//   let role = request.body.role;
//   let users = await userModel.findAll({
//     where: {
//       [Op.and]: [
//         { nama_user: { [Op.substring]: nama_user } },
//         { username: { [Op.substring]: username } },
//         { role: { [Op.substring]: role } },
//       ],
//     },
//   });
//   return response.json({
//     success: true,
//     data: users,
//     message: `berikut data yang anda minta yang mulia`,
//   });
// };

exports.addUser = (request, response) => {
  
    let newUser = {
      nama_user: request.body.nama_user,
      username: request.body.username,
      password: md5(request.body.password),
      role: request.body.role
    }

    userModel.create(newUser)
      .then((result) => {
        return response.json({
          success: true,  
          data: result,
          message: `User telah ditambahkan`
        })
      })

      .catch((error) => {
        return response.json({
          success: false,
          message: error.message
        })
      })
};

exports.updateUser = async (request, response) => {
      
  let idUser = request.params.id
  let dataUser = {
    nama_user: request.body.nama_user,
    username: request.body.username,
    password: md5(request.body.password),
    role: request.body.role
  }

  userModel.update(dataUser, { where: { id_user: idUser } })
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `Data user has been updated`,
      })
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      })
    })
}

exports.deleteUser = (request, response) => {
  let idUser = request.params.id;
  userModel
      .destroy({ where: { id_user: idUser } })
      .then((result) => {
          return response.json({
              success: true,
              message: `Data user has been delete`,
          })
      })
      .catch((error) => {
          return response.json({
              success: false,
              message: error.message,
          })
      })
}