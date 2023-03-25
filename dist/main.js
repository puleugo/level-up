"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const main_module_1 = require("./main.module");
const swagger_generator_1 = require("./app/infrastructure/swagger/swagger.generator");
(async () => {
    const app = await core_1.NestFactory.create(main_module_1.MainModule);
    swagger_1.SwaggerModule.setup('docs', app, (0, swagger_generator_1.default)(app), {
        swaggerOptions: { persistAuthorization: true },
    });
    await app.listen(process.env.APP_PORT || 3000, '' + '0.0.0.0');
})();
//# sourceMappingURL=main.js.map