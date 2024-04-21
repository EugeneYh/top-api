import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User'
				}
			}
		])
	],
	providers: [AuthService]
})
export class AuthModule { }
