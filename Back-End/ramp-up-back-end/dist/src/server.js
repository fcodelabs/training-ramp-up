"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("Ramp Up");
});
app.listen(8000, function () {
    console.log("Application started on port 3000!");
});
