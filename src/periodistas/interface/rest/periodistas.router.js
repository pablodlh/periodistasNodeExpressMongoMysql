"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPeriodistas = void 0;
const express_1 = __importDefault(require("express"));
const periodistas_usecases_1 = __importDefault(require("../../application/periodistas.usecases"));
const periodistas_repository_postgres_1 = __importDefault(require("../db/periodistas.repository.postgres"));
const router = express_1.default.Router();
exports.routerPeriodistas = router;
const periodistaRepository = new periodistas_repository_postgres_1.default();
const periodistaUseCases = new periodistas_usecases_1.default(periodistaRepository);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const periodista = {
            nombre: req.body.nombre,
            fechaNacimiento: req.body.fechaNacimiento
        };
        const result = yield periodistaUseCases.addPeriodista(periodista);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPeriodista = Number(req.params.id);
        const result = yield periodistaUseCases.getPeriodistaById(idPeriodista);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield periodistaUseCases.getPeriodistas();
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPeriodista = Number(req.params.id);
        const result = yield periodistaUseCases.deletePeriodista(idPeriodista);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPeriodista = Number(req.params.id);
        const nombrePeriodista = req.body.nombre;
        const fechaNacimiento = req.body.fechaNacimiento;
        const result = yield periodistaUseCases.editPeriodista(idPeriodista, fechaNacimiento, nombrePeriodista);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
