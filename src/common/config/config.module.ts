import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigWrapperService } from './config.service';

@Module({
  imports: [ConfigWrapperModule,ConfigModule.forRoot({ isGlobal: true })],
  providers: [ConfigWrapperService],
  exports: [ConfigWrapperService], 
})
export class ConfigWrapperModule {}
