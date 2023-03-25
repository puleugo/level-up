import { INestApplication } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
export default function generateSwaggerDocument(app: NestApplication | INestApplication): import("@nestjs/swagger").OpenAPIObject;
