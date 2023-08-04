const express = require('express');
const ReportController = require('../controllers/ReportControler');

const api = express.Router();
//Metodos recibidos desde la controladora
api.get('/report/count-ventas', ReportController.getCountVentasBySeller);
api.get('/report/count-products', ReportController.getCountProdByCategory);

module.exports = api;
