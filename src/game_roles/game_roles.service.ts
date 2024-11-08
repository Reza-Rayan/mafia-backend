import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameRoleDto } from './dto/create-game_role.dto';
import { UpdateGameRoleDto } from './dto/update-game_role.dto';
import { GameRole } from './entities/game_role.entity';

@Injectable()
export class GameRolesService {
  constructor(
    @InjectRepository(GameRole)
    private readonly gameRoleRepository: Repository<GameRole>,
  ) {}

  // Create a new GameRole
  async create(createGameRoleDto: CreateGameRoleDto): Promise<GameRole> {
    const existRole = await this.gameRoleRepository.findOne({where:{ title:createGameRoleDto.title}})
    if(existRole){
      throw new ConflictException("چنین رولی وجود دارد")
    }
    const newGameRole = this.gameRoleRepository.create(createGameRoleDto);
    return await this.gameRoleRepository.save(newGameRole);
  }

  // Find all GameRoles
  async findAll(): Promise<GameRole[]> {
    const gameRoles= await this.gameRoleRepository.find();
    if(gameRoles.length===0){
      throw new ConflictException("رولی در دیتابیس وجود ندارد")
    }
    return gameRoles
  }

  // Find a single GameRole by ID
  async findOne(id: string): Promise<GameRole> {
    const gameRole = await this.gameRoleRepository.findOne({ where: { id } });
    if (!gameRole) {
      throw new NotFoundException(`چنین رولی وجود ندارد`);
    }
    return gameRole;
  }

  // Update a GameRole by ID
  async update(id: string, updateGameRoleDto: UpdateGameRoleDto): Promise<GameRole> {
    const gameRole = await this.findOne(id);
    if(!gameRole){
      throw new ConflictException("همچین رولی وجود ندارد")
    }
    const updatedGameRole = Object.assign(gameRole, updateGameRoleDto);
    return await this.gameRoleRepository.save(updatedGameRole);
  }

  // Remove a GameRole by ID
  async remove(id: string): Promise<void> {
    const gameRole = await this.findOne(id);
    await this.gameRoleRepository.remove(gameRole);
  }
}
