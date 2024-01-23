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
Object.defineProperty(exports, "__esModule", { value: true });
class PeriodistaUseCases {
    constructor(periodistaRepository) {
        this.periodistaRepository = periodistaRepository;
    }
    addPeriodista(periodista) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.periodistaRepository.addPeriodista(periodista);
        });
    }
    deletePeriodista(idPeriodista) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.periodistaRepository.deletePeriodista(idPeriodista);
        });
    }
    getPeriodistaById(idPeriodista) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.periodistaRepository.getPeriodistaById(idPeriodista);
        });
    }
    getPeriodistas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.periodistaRepository.getPeriodistas();
        });
    }
    editPeriodista(idPeriodista, fechaNacimiento, nombrePeriodista) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.periodistaRepository.editPeriodista(idPeriodista, fechaNacimiento, nombrePeriodista);
        });
    }
}
exports.default = PeriodistaUseCases;
