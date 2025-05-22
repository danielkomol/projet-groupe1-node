import prisma from "../prisma/client.js";

// GET /vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// GET /vehicles/:id
export const getVehicleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// POST /vehicles (protégé)
export const createVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.create({ data: req.body });
    res.status(201).json(vehicle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

// PUT /vehicles/:id (protégé)
export const updateVehicle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: req.body,
    });
    res.json(vehicle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

// DELETE /vehicles/:id (protégé)
export const deleteVehicle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.vehicle.delete({ where: { id } });
    res.json({ message: "Véhicule supprimé" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: error.message });
  }
};
