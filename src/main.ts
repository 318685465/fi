import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

const listenPort = 3000;
const logger = new Logger("main.ts");

/**
 * @description 主方法
 * @date 06/06/2021
 */
const bootstrap = async () =>  {
  const app = await NestFactory.create(AppModule);
  /**
   * 配置Swagger
   */
  const options = new DocumentBuilder()
    .setTitle('项目管理平台')
    .setDescription('xxxx平台接口文档')
    .setVersion('1.0')
    .addBearerAuth(
      {type: "http", scheme: "bearer", bearerFormat: 'JWT'},
      'jwt'
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui', app, document);

  /**
   * 使用log4js 日志框架
  */
  app.useLogger(app.get(Log4jsLogger))

  await app.listen(listenPort);
}
bootstrap().then(() => {
  logger.log(`listen in http://localhost:${listenPort}/swagger-ui`);
});
