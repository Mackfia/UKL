// const md5 =require(`md5`)

const jwt = require(`jsonwebtoken`)

const adminModel = require(`../models/index`).admin

const secret = `fian`

const authenticate = async (request, response) => {
    let dataLogin = {
        email: request.body.email,
        password: request.body.password
    }
    let dataAdmin = await adminModel.findOne({ where: dataLogin })

    if(dataAdmin){
        let payload = JSON.stringify(dataAdmin)
        console.log(payload)

        let token = jwt.sign(payload, secret)
        return response.json({
            succress: true,
            logged: true,
            message: `Authentication Success`,
            token: token,
            data: dataAdmin
        })
    }
    return response.json({
        success: false,
        logged: false,
        message: `Authentication failed. Invalid username or password`
    })
}

const authorize = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        let verifiedAdmin = jwt.verify(token, secret);
        if (!verifiedAdmin) {
            return response.json({
                success: false,
                auth: false,
                message: `Admin Unauthorized`
            })
        }
        request.admin = verifiedAdmin;
        next();
    }
    else {
        return response.json({
            success: false,
            auth: false,
            message: `Admin Unauthorized`
        })
    }
}

module.exports = { authenticate, authorize }