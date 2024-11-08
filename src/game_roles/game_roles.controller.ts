import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateGameRoleDto } from './dto/create-game_role.dto';
import { UpdateGameRoleDto } from './dto/update-game_role.dto';
import { GameRolesService } from './game_roles.service';
import { GameRole } from './entities/game_role.entity';

@ApiTags('game-roles')
@Controller('game-roles')
export class GameRolesController {
  constructor(private readonly gameRolesService: GameRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game role' })
  @ApiResponse({ status: 201, description: 'The game role has been successfully created.', type: GameRole })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createGameRoleDto: CreateGameRoleDto) {
    return this.gameRolesService.create(createGameRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all game roles' })
  @ApiResponse({ status: 200, description: 'List of game roles', type: [GameRole] })
  findAll() {
    return this.gameRolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game role by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game role to retrieve' })
  @ApiResponse({ status: 200, description: 'The game role details', type: GameRole })
  @ApiResponse({ status: 404, description: 'Game role not found' })
  findOne(@Param('id') id: string) {
    return this.gameRolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a game role by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game role to update' })
  @ApiResponse({ status: 200, description: 'The updated game role', type: GameRole })
  @ApiResponse({ status: 404, description: 'Game role not found' })
  update(@Param('id') id: string, @Body() updateGameRoleDto: UpdateGameRoleDto) {
    return this.gameRolesService.update(id, updateGameRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game role by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the game role to delete' })
  @ApiResponse({ status: 200, description: 'The game role has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Game role not found' })
  remove(@Param('id') id: string) {
    return this.gameRolesService.remove(id);
  }
}
