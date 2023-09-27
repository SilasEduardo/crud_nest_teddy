import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


class Swagger {
  document(app: any) {
    const config = new DocumentBuilder()
      .setTitle('CRUD Teddy')
      .setDescription('Crud to teddy')
      .setVersion('1.0')
      .addTag('users')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  }
}

export default new Swagger()