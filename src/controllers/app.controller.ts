import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { PrismaService } from '../services/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const res = await this.prisma.user.create({
      data: {
        name: 'test',
        email: 'tes1t@exmaple.com',
      },
    });
    console.log(res);

    return JSON.stringify(res);
  }
}
