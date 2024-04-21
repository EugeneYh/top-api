import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
	login: 'ts1@test.com',
	password: '1'
}

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let token: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				token = body.access_token
				expect(token).toBeDefined()
			})
	});

	it('/auth/login (POST) - fail email', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'ts2@test.com' })
			.expect(401, {
				statusCode: 401,
                error: 'Unauthorized',
				message: 'User not found'
			})
	});

	it('/auth/login (POST) - fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '2' })
			.expect(401, {
				statusCode: 401,
                error: 'Unauthorized',
				message: 'Wrong password'
			})
	});

	afterAll(() => {
		disconnect();
	})
});
