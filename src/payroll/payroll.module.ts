import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { EarningTypeController } from './salary-component/earning-type/earning-type.controller';
import { EarningTypeModule } from './salary-component/earning-type/earning-type.module';

@Module({
  providers: [PayrollService],
  controllers: [PayrollController, EarningTypeController],
  imports: [ EarningTypeModule]
})
export class PayrollModule {}
