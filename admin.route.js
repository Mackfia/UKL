const express = require(`express`)

const app = express()

app.use(express.json())

const adminController = require(`../controllers/admin.controller`)
const { authorize } = require(`../controllers/auth.controller`)

app.get("/", authorize,  adminController.getAllAdmin)

app.get("/:key", authorize, adminController.findAdmin)

app.post("/", authorize, adminController.addAdmin)

app.put("/:id", authorize, adminController.updateAdmin)

app.delete("/:id",  authorize, adminController.deleteAdmin)

module.exports = app