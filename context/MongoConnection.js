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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = (_a = process.env.DB_CONN_STRING) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017';
const dbName = (_b = process.env.DB_NAME) !== null && _b !== void 0 ? _b : 'noticiasDB';
const collections = {};
exports.collections = collections;
function createMongoConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield mongodb_1.MongoClient.connect(url);
            const db = client.db(dbName);
            addCollections(db);
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.log('Connecting to MongoDB...');
            console.error('Error connecting to MongoDB:', error);
        }
    });
}
const addCollections = (db) => {
    var _a;
    collections.noticias = db.collection((_a = process.env.NOTICIAS_COLLECTION) !== null && _a !== void 0 ? _a : 'noticias');
};
exports.default = createMongoConnection;
