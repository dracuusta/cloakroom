"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    static index(_req, res) {
        res.render("index", {
            title: "home page"
        });
    }
}
exports.default = User;
//# sourceMappingURL=userController.js.map