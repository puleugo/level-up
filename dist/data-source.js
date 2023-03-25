"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.dataSourceConfig = void 0;
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
dotenv.config();
exports.dataSourceConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'community_server',
    username: process.env.DB_USERNAME || 'community_user',
    password: process.env.DB_PASSWORD || 'secret',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    synchronize: true,
    migrationsRun: true,
};
exports.dataSource = new typeorm_1.DataSource(exports.dataSourceConfig);
//# sourceMappingURL=data-source.js.map