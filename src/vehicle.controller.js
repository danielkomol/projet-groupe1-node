const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllVehicles = async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
};

exports.getVehicleById = async (req, res) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: parseInt(req.params.id) }});
  res.json(vehicle);
};

exports.createVehicle = async (req, res) => {
  const vehicle = await prisma.vehicle.create({ data: req.body });
  res.json(vehicle);
};

exports.updateVehicle = async (req, res) => {
  const vehicle = await prisma.vehicle.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  });
  res.json(vehicle);
};

exports.deleteVehicle = async (req, res) => {
  const vehicle = await prisma.vehicle.delete({ where: { id: parseInt(req.params.id) }});
  res.json(vehicle);
};
