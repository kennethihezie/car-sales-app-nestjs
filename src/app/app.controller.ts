import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('/:id')
  // async createUser(@Param('id') id: string) {
  //   console.log(id);
  // }

  // @Get()
  // async getUser(@Query('user') user: string) {
  //   console.log(user);
  // }
}
