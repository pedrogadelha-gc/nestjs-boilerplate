import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Vexis API')
  .setDescription('API para o projeto Vexis')
  .setVersion('1.0')
  .addTag('nestjs')
  .build();
