import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSettings } from 'src/schemas/user-setting.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ setting, ...createUserDto }: CreateUserDto) {
    if (setting) {
      const newSettings = new this.userSettingsModel(setting);
      const savedNewSetting = await newSettings.save();

      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedNewSetting._id,
      });

      return newUser.save();
    }

    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async getUsers() {
    return await this.userModel.find().populate(['settings', 'posts']);
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id).populate('settings');
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
