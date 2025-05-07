import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarningTypeEntity } from 'src/common/entities/earning-component.entity';
import { EarningTypeService } from './earning-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([EarningTypeEntity])],
  providers: [EarningTypeService],
  exports: [EarningTypeService]

})
export class EarningTypeModule {}
