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
const express_1 = __importDefault(require("express"));
const recursos_usecases_1 = __importDefault(require("../../application/recursos.usecases"));
const recursos_respository_postgres_1 = __importDefault(require("../db/recursos.respository.postgres"));
const router = express_1.default.Router();
const recursoRepository = new recursos_respository_postgres_1.default();
const recursoUseCases = new recursos_usecases_1.default(recursoRepository);
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recurso = {
            url: req.body.url
        };
        const result = yield recursoUseCases.addRecurso(recurso);
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
        const idRecurso = Number(req.params.id);
        const result = yield recursoUseCases.deleteRecurso(idRecurso);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
