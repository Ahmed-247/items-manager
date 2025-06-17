import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>
  ) {}


  create(dto: CreateItemDto, user:User) {
    console.log('DTO keys:', Object.keys(dto));

    console.log('Received DTO:', dto); // 🔍 Logs the incoming request data
    console.log('Current User:', user); // 🔍 Logs the user from the request (JWT)

     if (!dto.name || !dto.description) {
      throw new BadRequestException('Missing required fields');
  }

    const item = this.itemRepo.create({...dto, owner:user})
    console.log('Item before saving:', item);
    return this.itemRepo.save(item);
  }

  findAllByUser(id: number){
    return this.itemRepo.find({where: {owner:{id:id}}})
  }

  findAll() {
    return this.itemRepo.find({relations:['owner']});
  }

  async findOne(id: number) {
    const item = await this.itemRepo.findOneBy({id})
    if(!item) throw new NotFoundException('Item not found')
    
    return item
  }

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id)
    Object.assign(item, dto)
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id)
    return this.itemRepo.remove(item);
  }
}
