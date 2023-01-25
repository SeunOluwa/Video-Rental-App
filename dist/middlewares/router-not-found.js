"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerNotFound = (req, res, next) => {
    return res.status(404).json({ message: "Route does not exists" });
};
exports.default = routerNotFound;
//# sourceMappingURL=router-not-found.js.map