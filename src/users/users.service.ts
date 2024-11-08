import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    const users = await this.userRepository.find()
    if(users.length===0){
      throw new NotFoundException("کاربری وجود ندارد");
    }
    return users
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({where:{id}});

    if(!user){
      throw new NotFoundException("کاربر مورد نظر وجود ندارد");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('کاربر مورد نظر وجود ندارد');
    }

    // Update the user data with the provided DTO
    Object.assign(user, updateUserDto);

    // Save the updated user back to the database
    return await this.userRepository.save(user);
  }


  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('کاربر مورد نظر وجود ندارد');
    }


    await this.userRepository.delete(id);

    return { message: `کاربر با آیدی ${id} حذف شد.` };
  }


  // Request of User ro be provider
  async changeRoleToPending(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('کاربر مورد نظر وجود ندارد');
    }

    // Check if the user already has the "PENDING" role or another conflicting role
    if (user.role === UserRole.PENDING) {
      throw new ConflictException('کاربر در حال حاضر درخواست ارائه دهنده دارد.');
    }

    // Update the user role to "PENDING"
    user.role = UserRole.PENDING;
     this.userRepository.save(user);

     return {message:"درخواست شما با موفقیت ارسال شد. منتظر بمانید"}
  }
  // End here


  // Accept Request of user to be provider
  async acceptPendingUsers() {
    const pendingUsers = await this.userRepository.find({ where: { role: UserRole.PENDING } });

    if (pendingUsers.length === 0) {
      throw new NotFoundException('هیچ کاربری با وضعیت در حال انتظار وجود ندارد.');
    }
    const updatedUsers = await Promise.all(
      pendingUsers.map(async (user) => {
        user.role = UserRole.PROVIDER;
        return this.userRepository.save(user);
      })
    );

    return updatedUsers;
  }
// End here
}
