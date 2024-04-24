import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }
	
	async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto)
	}
	
	async findById(id: string) {
        return this.topPageModel.findById(id).exec()
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec()
	}
	
	async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec()
	}
	
	async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}
	
	async findWithCategory(dto: FindTopPageDto) { 
		return await this.topPageModel.aggregate([
			{
				$match: {
					firstCategory: dto.firstCategory
				}
			},
			{
				$sort: {
					_id: 1
				}
			}
		])  
	}
}
