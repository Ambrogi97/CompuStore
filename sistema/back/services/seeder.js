const User = require('../models/user')
const Category = require('../models/category')
const Provider = require('../models/provider')
const Marca = require('../models/marca')
const bcrypt = require('bcryptjs');
const { ADMIN, VENDEDOR } = require('../types/types')

exports.seed = async () => {
    const existingUser = await User.findOne()
    if (existingUser) {
        console.log('Skipping seeder')
        return
    }

    await Promise.all([
        seedUsers(),
        seedCategory(),
        seedProveedores(),
        seedMarca()
    ])
}

const seedUsers = async () => {
    console.log('Seeding users...')
    const password = await bcrypt.hash('Test123456', 12)

    const user = new User()
    user.password = password;
    user.nombre = 'Admin';
    user.apellido = 'admin';
    user.email = 'admin@sistema.com';
    user.role = ADMIN

    const userVendedor1 = new User()
    userVendedor1.password = password;
    userVendedor1.nombre = 'Juan cruz';
    userVendedor1.apellido = 'Ambrogi';
    userVendedor1.email = 'jcambrogi67@sistema.com';
    userVendedor1.role = VENDEDOR

    const userVendedor2 = new User()
    userVendedor2.password = password;
    userVendedor2.nombre = 'Renzo';
    userVendedor2.apellido = 'Orazi';
    userVendedor2.email = 'rorazi@sistema.com';
    userVendedor2.role = VENDEDOR

    await Promise.all([
        user.save(),
        userVendedor1.save(),
        userVendedor2.save()
    ])
}


const seedCategory = async () => {
    console.log('Seeding categories...')
    const category1 = new Category()
    category1.nombre = 'Teclados'
    category1.descripcion = 'asd'

    const category2 = new Category()
    category2.nombre = 'Notebooks'
    category2.descripcion = 'asd'

    const category3 = new Category()
    category3.nombre = 'Motherboard'
    category3.descripcion = 'asd'

    const category4 = new Category()
    category4.nombre = 'CPU'
    category4.descripcion = 'asd'

    const category5 = new Category()
    category5.nombre = 'Monitores'
    category5.descripcion = 'asd'

    await Promise.all([
        await category1.save(),
        await category2.save(),
        await category3.save(),
        await category4.save(),
        await category5.save(),
    ])
}

const seedProveedores = async () => {
    console.log('Seeding proveedores...')
    const proveedor1 = new Provider()
    proveedor1.nombre = 'Marstech'
    proveedor1.direccion = 'Mendoza 2566'

    const proveedor2 = new Provider()
    proveedor2.nombre = 'Airoldi'
    proveedor2.direccion = 'Segui 5000'

    await Promise.all([
        proveedor1.save(),
        proveedor2.save(),
    ])
}

const seedMarca = async () => {
    const proveedor1 = new Marca()
    proveedor1.nombre = 'AMD'

    const proveedor2 = new Marca()
    proveedor2.nombre = 'Intel'

    await Promise.all([
        proveedor1.save(),
        proveedor2.save(),
    ])
}

