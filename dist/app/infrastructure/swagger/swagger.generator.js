"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const swagger_tags_1 = require("./swagger.tags");
const document = new swagger_1.DocumentBuilder()
    .setTitle(`COMMUNITY APP API`)
    .setDescription('커뮤니티 앱 API 문서')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setVersion('1.0.0');
swagger_tags_1.tags.forEach((tag) => document.addTag(tag.name, tag.description));
function generateSwaggerDocument(app) {
    return swagger_1.SwaggerModule.createDocument(app, document.build());
}
exports.default = generateSwaggerDocument;
//# sourceMappingURL=swagger.generator.js.map