import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { config } from "../../configs/Jwt.js";
import { companies } from "../../configs/database.js";

export const create = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let company = {
        ...req.body,
        id: uuidv4(),
        vehicles: [],
        password: hashedPassword,
    };
    companies.push(company);
    return res.status(201).json({ message: "Company successfully created", company });
};

export const login = async (req, res) => {
    const { cnpj, password } = req.body;
    let company = companies.find((company) => company.cnpj === cnpj);
    const match = await bcrypt.compare(password, company.password);

    if (!company) {
        return res.status(401).json({ message: "Company not found" });
    }
    if (!match) {
        return res.status(401).json({ message: "User and password missmatch" });
    }

    let token = jwt.sign({ cnpj: cnpj }, config.secret, {
        expiresIn: config.expiresIn,
    });

    return res.status(200).json({ token, company });
};

export const list = (req, res) => {
    return res.json(companies);
};

export const update = (req, res) => {
    let { company } = req;
    let updatedCompany = { ...company, ...req.body };

    let index = companies.indexOf(company);

    companies[index] = updatedCompany;

    return res.status(200).json({ message: "Company updated", companies });
};

export const destroy = (req, res) => {
    let { cnpj } = req.params;

    companies = companies.filter((company) => company.cnpj !== cnpj);

    return res.status(200).jso({ message: "Company deleted", companies });
};