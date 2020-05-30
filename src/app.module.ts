import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FaceController } from './controllers/face.controller';
import { IndexController } from './controllers/index.controller';
import { FaceService } from './services/face.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({ dest: 'upload' })
  ],
  controllers: [
    IndexController,
    FaceController
  ],
  providers: [
    FaceService
  ],
})
export class AppModule {}
