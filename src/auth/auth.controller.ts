import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXISTS_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const existUser = await this.authService.findUser(dto.login)
		if (existUser) {
			throw new BadRequestException(USER_ALREADY_EXISTS_ERROR)
		}
		return this.authService.createUser(dto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password)
		return await this.authService.login(email)
	}
}
