import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) { }

	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		console.log(dto)
		return await this.topPageService.create(dto)
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		let page = await this.topPageService.findById(id)

		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}

		return page
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		let page = await this.topPageService.findByAlias(alias)

		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}

		return page
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		let deletedPage = await this.topPageService.deleteById(id)
		
		if (!deletedPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		let updatedPage = await this.topPageService.updateById(id, dto)

		if (!updatedPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return updatedPage
	}

	@UsePipes(new ValidationPipe()) 
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return await this.topPageService.findWithCategory(dto) 
	}
}
