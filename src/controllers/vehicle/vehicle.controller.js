import { v4 as uuidv4 } from "uuid";

export const createVehicle = async (req, res) => {
    let newVehicle = { ...req.body, id: uuidv4(), acquisition_date: new Date() };
    let { company } = req;

    company.vehicles.push(newVehicle);

    return res.status(201).json({
        message: `Vehicle ${newVehicle.model} from year ${newVehicle.year} was acquires to the ${company.name}'s fleet`,
        vehicle: newVehicle,
    });
};

export const listVehicle = (req, res) => {
    return res.status(200).json(req.company.vehicles);
};

export const updateVehicle = (req, res) => {
    let { vehicle, company } = req;
    let updatedVehicle = { ...vehicle, ...req.body };
    let index = company.vehicle.indexOf(vehicle);

    company.vehicles[index] = updatedVehicle;

    return res.status(200).json({ message: "Vehicle updated", vehicle: updatedVehicle });
};

export const destroyVehicle = async (req, res) => {
    let { plate } = req.params;
    let { company } = req;

    company.vehicles = company.vehicles.filter(
        (vehicle) => vehicle.plate !== plate
    );

    return res.status(200).json({ message: "Vehicle deleted", vehicles: company.vehicles });
};