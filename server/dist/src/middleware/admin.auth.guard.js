"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthGuard = void 0;
function AdminAuthGuard(req, res, next) {
    // @ts-ignore
    if (req.user.role !== "ADMIN") {
        return res.status(403).send("Unauthorized!");
    }
    return next();
}
exports.AdminAuthGuard = AdminAuthGuard;
