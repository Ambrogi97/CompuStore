const Product = require("../models/product")
const Venta = require("../models/venta")

const getCountVentasBySeller = async (req, res) => {

    const vendedores = {}
    const ventas = await Venta
        .find()
        .populate('user')
        .exec()

    for (const venta of ventas) {
        const { user } = venta
        if (!vendedores[user._id]) {
            vendedores[user._id] = {
                id: user._id,
                nombre: `${user.nombre} ${user.apellido}`,
                ventas: 0
            }
        }
        vendedores[user._id].ventas++
    }

    const countVentasBySellers = Object.keys(vendedores).map(x => vendedores[x])
    res.status(200).send(countVentasBySellers)
}

const getCountProdByCategory = async (req, res) => {

    const categories = {}
    const productos = await Product
        .find()
        .populate('nitcategoria')
        .exec()

    for (const product of productos) {
        const { nitcategoria } = product
        if (!categories[nitcategoria._id]) {
            categories[nitcategoria._id] = {
                id: nitcategoria._id,
                nombre: `${nitcategoria.nombre}`,
                productos: 0
            }
        }
        categories[nitcategoria._id].productos++
    }

    const countProdByCategory = Object.keys(categories).map(x => categories[x])
    console.log(countProdByCategory)
    res.status(200).send(countProdByCategory)
}


module.exports = {
    getCountVentasBySeller,
    getCountProdByCategory
}