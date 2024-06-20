const adminModel = require(`../models/index`).admin
// const md5 = require(`md5`)

const Op = require(`sequelize`).Op


exports.getAllAdmin = async  (request, response) => {
    let admins = await adminModel.findAll()
    return response.json({
        success: true,
        data: admins,
        massage: `All admins have been loaded`
    })
}

exports.findAdmin = async (request, response) => {
    let keyword = request.params.key
    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { admin_id: { [Op.substring]: keyword }},
                { name: { [Op.substring]: keyword }},
                { email: { [Op.substring]: keyword }}
            ]
        }
    })
    return response.json({
        seccess: true,
        data: admins,
        massage: `All admins have been loaded`
    })
}

exports.addAdmin = (request, response) => {
    let newAdmin = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.passwor
    }
    adminModel.create(newAdmin)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                massage: `New admin has been inserted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.updateAdmin = (request, response) => {
    let dataAdmin = {
        name: request.body.name,
        email: request.body.email
    }
    if (request.body.password){
        dataAdmin.password = request.body.password
    }

    let admin_id = request.params.id

    adminModel.update(dataAdmin, { where: { admin_id : admin_id } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteAdmin = (request, response) => {
    let admin_id = request.params.id

    adminModel.destroy({ where: { admin_id: admin_id } })
    .then(result => {
        return response.json({
            success: true,
            messange: `Data adminhas been deleted`
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}