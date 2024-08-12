"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const axios = __importStar(require("axios"));
const readline = __importStar(require("readline-sync"));
function readFileContent(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (path.startsWith('http')) {
            const response = yield axios.default.get(path);
            return response.data;
        }
        else {
            return fs.promises.readFile(path, 'utf-8');
        }
    });
}
function analyzeContent(content) {
    const wordCounts = new Map();
    let totalWords = 0;
    let totalLetters = 0;
    let totalSpaces = 0;
    const words = content.split(/\s+/);
    words.forEach(word => {
        totalWords++;
        totalLetters += word.length;
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });
    totalSpaces = content.split(' ').length - 1;
    const frequentWords = Array.from(wordCounts.entries())
        .filter(([_, count]) => count > 10)
        .map(([word, count]) => ({ word, count }));
    return {
        totalWords,
        totalLetters,
        totalSpaces,
        frequentWords,
    };
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const path = readline.question('Inserisci il path del file (locale o URL): ');
        try {
            const content = yield readFileContent(path);
            const result = analyzeContent(content);
            console.log(`Numero totale di parole: ${result.totalWords}`);
            console.log(`Numero totale di lettere: ${result.totalLetters}`);
            console.log(`Numero totale di spazi: ${result.totalSpaces}`);
            console.log('Parole che si ripetono più di 10 volte:');
            result.frequentWords.forEach(({ word, count }) => {
                console.log(`"${word}": ${count} volte`);
            });
        }
        catch (error) {
            console.error('Errore:', error.message);
        }
    });
}
main();
//# sourceMappingURL=index.js.map