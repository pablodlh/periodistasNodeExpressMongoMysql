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
exports.routerNoticias = void 0;
const express_1 = __importDefault(require("express"));
const noticias_usecases_1 = __importDefault(require("../../application/noticias.usecases"));
const noticias_repository_mongo_1 = __importDefault(require("../db/noticias.repository.mongo"));
const router = express_1.default.Router();
exports.routerNoticias = router;
const noticiaRepository = new noticias_repository_mongo_1.default();
const noticiaUseCases = new noticias_usecases_1.default(noticiaRepository);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticias = yield noticiaUseCases.getNoticias();
        res.json(noticias);
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
        const idNoticia = String(req.params.id);
        const noticia = yield noticiaUseCases.getNoticiaById(idNoticia);
        res.json(noticia);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.get('/periodista/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPeriodista = Number(req.params.id);
        const noticias = yield noticiaUseCases.getNoticiasByPeriodista(idPeriodista);
        res.json(noticias);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticia = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            periodistas: req.body.periodistas,
            recursos: req.body.recursos
        };
        const result = yield noticiaUseCases.addNoticia(noticia);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idNoticia = String(req.params.id);
        const result = yield noticiaUseCases.deleteNoticia(idNoticia);
        res.json(result);
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
