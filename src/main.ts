import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseSuccessInterceptor } from './common/interceptor/response-success.interceptor';
import { ProtectGuard } from './common/protectAPI/protectApi.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // //bật validation global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //loại bỏ những field không có trong dto
      forbidNonWhitelisted: true, //Nếu trong dto không khai báo sẽ báo lỗi => throw error
    }),
  );

  // Sử dụng protectAPI
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ProtectGuard(reflector));

  // Sử dụng interceptor global -> Định dạng lại dữ liệu trả về
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Airbnb')
    .setDescription('The Airbnb API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'accessToken', // Key này sẽ dùng để đánh dấu @ApiBearerAuth() trong controller
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true }, // Lưu token trên swagger
  });

  // Run app
  await app.listen(PORT ?? 3000);
}
bootstrap();
