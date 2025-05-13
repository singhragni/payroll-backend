import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import * as express from "express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { JwtGlobalGuard } from "./auth/guards/jwt-global.guard";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Apply JwtGlobalGuard globally
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtGlobalGuard(reflector));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  //app.useGlobalFilters(new AllExceptionsFilter());
  const globalPrefix = "api/v1";
  dotenv.config();
  app.use(express.json({ limit: "10mb" }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix(globalPrefix);

  // Swagger configuration
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("TRMS")
    .setDescription("TRMS application api")
    .setVersion("1.0")
    .addTag("TRMS") // You can add any tags to organize your endpoints
    .addCookieAuth("accessToken")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:1234",
    credentials: true,
    // methods: ['GET', 'POST', 'DELETE']
  });


 app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('CORS headers being sent:', {
      'Access-Control-Allow-Origin': res.getHeader('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Credentials': res.getHeader('Access-Control-Allow-Credentials'),
    });
  });
  next();
});

  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT);

  Logger.log(
    `🚀 Application successfully started -  http://localhost:${PORT}/${globalPrefix}`,
  );
}

bootstrap();
