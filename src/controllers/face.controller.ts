import { Controller, HttpException, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FaceService } from '../services/face.service';

@Controller('faces')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('encoding')
  @UseInterceptors(FileInterceptor('file'))
  async encoding(
    @UploadedFile() file,
    @Res() res,
    @Query('mode') mode,
    @Query('render') render,
    @Query('renderLandmark') renderLandmark
  ) {
    try {
      const isMultiple = mode === 'multiple';
      const isRender = render === 'true';
      const isRenderLandmark = renderLandmark === 'true';

      let result: any;
      if (isMultiple) {
        result = await this.faceService.encodings(file.path, isRender, isRenderLandmark);
      } else {
        result = await this.faceService.encoding(file.path, isRender, isRenderLandmark);
      }

      if (isRender || isRenderLandmark) {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': result.length
        });
        res.end(result); 
      } else {
        res.send({ data: result });
      }
    } catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('landmark')
  @UseInterceptors(FileInterceptor('file'))
  async landmark(
    @UploadedFile() file,
    @Res() res,
    @Query('mode') mode,
    @Query('render') render,
    @Query('renderLandmark') renderLandmark
  ) {
    try {
      const isMultiple = mode === 'multiple';
      const isRender = render === 'true';
      const isRenderLandmark = renderLandmark === 'true';

      let result: any;
      if (isMultiple) {
        result = await this.faceService.landmarks(file.path, isRender, isRenderLandmark);
      } else {
        result = await this.faceService.landmark(file.path, isRender, isRenderLandmark);
      }

      if (isRender || isRenderLandmark) {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': result.length
        });
        res.end(result); 
      } else {
        res.send({ data: result });
      }
    } catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
