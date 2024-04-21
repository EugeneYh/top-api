import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
        @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
    ) { }

	async createUser(dto: AuthDto) {
		const salt = genSaltSync(10)
		const newUser = new this.userModel({
			email: dto.login,
            passwordHash: hashSync(dto.password, salt)
		})
		return newUser.save()
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec()
	}
}
