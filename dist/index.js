"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 3000;
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use('/', user_1.default);
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map