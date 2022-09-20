"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthGuard = void 0;
function UserAuthGuard(req, res, next) {
    // @ts-ignore
    if (!req.user) {
        return res.status(403).send("Unauthorized!");
    }
    return next();
}
exports.UserAuthGuard = UserAuthGuard;
