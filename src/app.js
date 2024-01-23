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
/* eslint-disable */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const periodistas_router_1 = require("./periodistas/interface/rest/periodistas.router");
const noticias_router_1 = require("./noticias/interface/rest/noticias.router");
const MongoConnection_1 = __importDefault(require("../context/MongoConnection"));
const noticias_repository_mongo_1 = require("./noticias/interface/db/noticias.repository.mongo");
(0, MongoConnection_1.default)();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/api/periodistas', periodistas_router_1.routerPeriodistas);
app.use('/api/noticias', noticias_router_1.routerNoticias);
app.get('/noticias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticias = yield noticias_repository_mongo_1.noticiasRepo.devolverConstanteNoticias();
    res.render('noticias', { noticias });
}));
noticias_repository_mongo_1.noticiasRepo.devolverConstanteNoticias().then(noticias => {
    console.log(noticias);
});
app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
