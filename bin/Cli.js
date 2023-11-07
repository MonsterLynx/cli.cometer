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
exports.Cli = void 0;
const select_1 = __importDefault(require("@inquirer/select"));
const input_1 = __importDefault(require("@inquirer/input"));
const confirm_1 = __importDefault(require("@inquirer/confirm"));
const GitProcessor_1 = require("./GitProcessor");
class Cli {
    constructor(git = new GitProcessor_1.GitProcessor()) {
        this.git = git;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = yield (0, select_1.default)({
                message: 'Type of commit',
                choices: [
                    {
                        name: 'feat',
                        value: 'feat',
                        description: 'Feature'
                    },
                    {
                        name: 'fix',
                        value: 'fix',
                        description: 'Fix'
                    },
                    {
                        name: 'refactor',
                        value: 'refactor',
                        description: 'Refactor'
                    },
                    {
                        name: 'chore',
                        value: 'chore',
                        description: 'Chore'
                    }
                ]
            });
            const message = yield (0, input_1.default)({
                message: 'Type in commit message'
            });
            const task = yield this.git.taskId();
            const branch = yield this.git.current();
            const result = `${prefix}: ${message} [${task}]`;
            const confirmCommit = yield (0, confirm_1.default)({
                message: `You are about to commit "${result}" to branch "${branch}". Confirm?`
            });
            if (confirmCommit) {
                yield new GitProcessor_1.GitProcessor().commit(result);
                console.log('Commit Successful!');
            }
        });
    }
}
exports.Cli = Cli;
