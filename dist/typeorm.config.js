"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "Role_Management",
    entities: [(0, path_1.join)(process.cwd(), "dist/**/*.entity.js")],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=typeorm.config.js.map