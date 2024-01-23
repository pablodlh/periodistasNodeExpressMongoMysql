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
class PeriodistasRepositoryPostgres {
    addPeriodista(periodista) {
        return __awaiter(this, void 0, void 0, function* () {
            if (periodista.nombre != null && periodista.fechaNacimiento != null) {
                let result = yield (0, Postgress_Connection_1.default)('SELECT MAX(id) FROM periodistas');
                console.log(result);
                let id = result[0].max;
                let idNuevo = id + 1;
                console.log(result);
                yield (0, Postgress_Connection_1.default)(`insert into periodistas values ('${idNuevo}','${periodista.nombre}','${periodista.fechaNacimiento}')`);
                const message = {
                    text: `El usuario ${periodista.nombre} ha sido creado`
                };
                return message;
            }
            const message = {
                text: 'No se ha proporcionado correctamente el usuario'
            };
            return message;
        });
    }
    deletePeriodista(idPeriodista) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, Postgress_Connection_1.default)(`delete from Periodistas where id = ${idPeriodista}`);
            const message = {
                text: `el periodista con id ${idPeriodista} ha sido borrado correctamente`
            };
            return message;
        });
    }
    getPeriodistaById(idPeriodista) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Postgress_Connection_1.default)(`select * from periodistas where id = ${idPeriodista}`);
            if (result.length === 0)
                return undefined;
            const periodista = {
                id: result[0].id,
                nombre: result[0].nombre,
                fechaNacimiento: result[0].fechaNacimiento
            };
            return periodista;
        });
    }
    getPeriodistas() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Postgress_Connection_1.default)('select * from periodistas');
            const periodistas = result.map((periodista) => {
                return {
                    id: periodista.id,
                    nombre: periodista.nombre,
                    fechaNacimiento: periodista.fechaNacimiento
                };
            });
            return periodistas;
        });
    }
    editPeriodista(idPeriodista, fechaNacimiento, nombrePeriodista) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, Postgress_Connection_1.default)(`update periodistas set nombre = '${nombrePeriodista}', fechaNacimiento = '${fechaNacimiento}' where id = ${idPeriodista}`);
            const message = {
                text: `El periodista con id ${idPeriodista} ha sido actualizado`
            };
            return message;
        });
    }
}
exports.default = PeriodistasRepositoryPostgres;
