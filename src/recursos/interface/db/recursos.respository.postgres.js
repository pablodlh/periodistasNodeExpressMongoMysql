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
const Postgress_Connection_1 = __importDefault(require("../../../../context/Postgress.Connection"));
class RecursosRepositoryPostgres {
    addRecurso(recurso) {
        return __awaiter(this, void 0, void 0, function* () {
            if (recurso.url != null) {
                yield (0, Postgress_Connection_1.default)(`insert into recursos values ('${recurso.url}')`);
                const message = {
                    text: `El recurso ha sido creado correctamente`
                };
                return message;
            }
            const message = {
                text: 'No se ha proporcionado correctamente el recurso'
            };
            return message;
        });
    }
    deleteRecurso(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, Postgress_Connection_1.default)(`delete from recursos where id = '${id}'`);
            const message = {
                text: `el recurso con id ${id} ha sido borrado correctamente`
            };
            return message;
        });
    }
    getRecursoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Postgress_Connection_1.default)(`select * from recursos where id = '${id}'`);
            if (result.length === 0)
                return undefined;
            const recurso = {
                id: result[0].id,
                url: result[0].url
            };
            return recurso;
        });
    }
}
exports.default = RecursosRepositoryPostgres;
