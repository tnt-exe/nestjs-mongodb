import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserSettingsDto } from './dto/create-user.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiBody({
    type: CreateUserDto,
    description: 'hmm body ig',
    examples: {
      body: {
        value: {
          userName: 'nameee',
          displayName: 'asadas',
          setting: {
            receiveEmail: true,
            receiveNotification: true,
            receiveSMS: true,
          } as CreateUserSettingsDto,
        } as CreateUserDto,
      },
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('id invalid');
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('id invalid');
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('id invalid');
    return await this.userService.deleteUser(id);
  }
}
