import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}


	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deleteDoc = await this.reviewService.delete(id)
		if (!deleteDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		} else {
			return deleteDoc
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async getByProductId(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId)
	}

}
