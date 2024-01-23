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
exports.noticiasRepo = void 0;
/*eslint-disable*/
const mongodb_1 = require("mongodb");
const MongoConnection_1 = require("../../../../context/MongoConnection");
const MongoConnection_2 = __importDefault(require("../../../../context/MongoConnection"));
const periodistas_repository_postgres_1 = __importDefault(require("../../../periodistas/interface/db/periodistas.repository.postgres"));
const recursos_respository_postgres_1 = __importDefault(require("../../../recursos/interface/db/recursos.respository.postgres"));
class NoticiaRepositoryMongo {
    getNoticias() {
        return __awaiter(this, void 0, void 0, function* () {
            const noticiasFromDb = yield MongoConnection_1.collections.noticias.find().toArray();
            if (!noticiasFromDb)
                return undefined;
            const noticias = noticiasFromDb.map((noticiaFromDB) => {
                const noticia = {
                    id: String(noticiaFromDB._id),
                    titulo: noticiaFromDB.titulo,
                    texto: noticiaFromDB.texto,
                    periodistas: noticiaFromDB.periodistas,
                    recursos: noticiaFromDB.recursos
                };
                return noticia;
            });
            return noticias;
        });
    }
    getNoticiaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obejectId = new mongodb_1.ObjectId(id);
            const noticiaFromDB = yield MongoConnection_1.collections.noticias.findOne({ _id: obejectId });
            if (!noticiaFromDB)
                return undefined;
            const noticia = {
                id: String(noticiaFromDB._id),
                titulo: noticiaFromDB.titulo,
                texto: noticiaFromDB.texto,
                periodistas: noticiaFromDB.periodistas,
                recursos: noticiaFromDB.recursos
            };
            return noticia;
        });
    }
    getNoticiasByPeriodista(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticiasFromDb = yield MongoConnection_1.collections.noticias.find({ periodistas: id }).toArray();
            if (!noticiasFromDb)
                return undefined;
            const noticias = noticiasFromDb.map((noticiaFromDB) => {
                const noticia = {
                    id: String(noticiaFromDB._id),
                    titulo: noticiaFromDB.titulo,
                    texto: noticiaFromDB.texto,
                    periodistas: noticiaFromDB.periodistas,
                    recursos: noticiaFromDB.recursos
                };
                return noticia;
            });
            return noticias;
        });
    }
    addNoticia(noticia) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticiaToDB = {
                titulo: noticia.titulo,
                texto: noticia.texto,
                periodistas: noticia.periodistas,
                recursos: noticia.recursos
            };
            const result = yield MongoConnection_1.collections.noticias.insertOne(noticiaToDB);
            const id = String(result.insertedId);
            const message = {
                text: `la noticia con id ${id} ha sido creada`
            };
            return message;
        });
    }
    deleteNoticia(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectId(id);
            const result = yield MongoConnection_1.collections.noticias.deleteOne({ _id: objectId });
            const numeroBorrado = String(result.deletedCount);
            const message = {
                text: `se ha eliminado ${numeroBorrado} noticia`
            };
            return message;
        });
    }
    devolverConstanteNoticias() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, MongoConnection_2.default)().then(() => __awaiter(this, void 0, void 0, function* () {
                const noticiasRepo = new NoticiaRepositoryMongo();
                const periodistaRepo = new periodistas_repository_postgres_1.default();
                const recursoRepo = new recursos_respository_postgres_1.default();
                const NoticiasIniciales = yield noticiasRepo.getNoticias();
                const nuevasNoticias = [];
                if (NoticiasIniciales) {
                    for (const noticia of NoticiasIniciales) {
                        const nuevaNoticia = Object.assign({}, noticia);
                        const nombresPeriodistas = [];
                        const urlsRecursos = [];
                        for (const idPeriodista of nuevaNoticia.periodistas.map(Number)) {
                            const periodista = yield periodistaRepo.getPeriodistaById(idPeriodista);
                            if (periodista) {
                                nombresPeriodistas.push(periodista.nombre);
                            }
                        }
                        for (const idRecurso of nuevaNoticia.recursos.map(Number)) {
                            const recurso = yield recursoRepo.getRecursoById(idRecurso);
                            if (recurso) {
                                urlsRecursos.push(recurso.url);
                            }
                        }
                        nuevaNoticia.periodistas = nombresPeriodistas;
                        nuevaNoticia.recursos = urlsRecursos;
                        nuevasNoticias.push(nuevaNoticia);
                    }
                }
                return nuevasNoticias;
            }));
        });
    }
}
exports.default = NoticiaRepositoryMongo;
const noticiasRepo = new NoticiaRepositoryMongo();
exports.noticiasRepo = noticiasRepo;
