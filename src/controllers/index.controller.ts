import { Controller, Get } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get()
  async index() {
    return { status: 'Nest Face API', uptime: process.uptime() };
  }
}
