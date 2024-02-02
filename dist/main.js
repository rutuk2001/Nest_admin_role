"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const passport = require("passport");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: "test",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 120000 },
    }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map