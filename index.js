const express = require(`express`)

const app = express()

const PORT = 3000

const cors = require(`cors`)
// const bodyParser = require("body-parser")

app.use(cors())

const adminRoute = require(`./routes/admin.route`)
const foodRoute = require(`./routes/food.route`)
// const order_listRoute = require(`./routes/order_list.route`)
const orderRoute = require(`./routes/order.route`)
const auth = require(`./routes/auth.route`)

app.use(`/admin`, adminRoute)
app.use(`/food`, foodRoute)
// app.use(`/order_list`, order_listRoute)
app.use(`/order_list`, orderRoute)
app.use(`/auth`, auth)

app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`Server of UKL runs on port ${PORT}`)
})