import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/@enums/User-Role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}


  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({where:{phone: createUserDto.phone}})
    if(existUser){
      throw new ConflictException('حساب کاربری این شماره وجود دارد.');
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
      role:UserRole.PLAYER
    });
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
