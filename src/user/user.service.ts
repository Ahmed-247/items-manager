import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly userRepo: Repository<User>
){}

  async create(dto: CreateUserDto) {
    const {name, email, password, role} = dto
    const existing = await this.userRepo.findOne({where:{email}})
    if (existing) throw new ConflictException('Email already in use')

    const hashed = await bcrypt.hash(password, 10)

    const user = this.userRepo.create({name, email, password:hashed, role})

    return this.userRepo.save(user);
  }

  findByEmail(email:string){
    return this.userRepo.findOne({where:{email}})
  }

  findById(id:number){
    return this.userRepo.findOne({where:{id}})
  }

  findAll() {
    return this.userRepo.find({relations: ['items'],});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
