import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException, Request as Request1 } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { CaslGuard } from 'src/casl/casl.guard';
import { CheckAbilities } from 'src/casl/casl.decorator';
import { Actions } from 'src/casl/casl-ability.factory';

@UseGuards(JwtAuthGuard)
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  
  @Post()
  create(@Body() dto: CreateItemDto, @Request1() req) {
    
  const user = req.user
    return this.itemService.create(dto, user);
  }

  @Get('my')
  findMyItems(@Request1() req){
    return this.itemService.findAllByUser(req.user.id)
  }
  @UseGuards(JwtAuthGuard, CaslGuard)
  @Get()
  @CheckAbilities({ action: Actions.Manage, subject: 'all' })
  findAll() {
    return this.itemService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemService.update(+id, dto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
