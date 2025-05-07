import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from "class-validator";
import { EarningTypes } from "src/common/entities/enum/earning-component.enum";

export class CreateEarningTypeDto {
  @IsBoolean()
  @ApiProperty({
    description: "Indicated if the earning type is texable.",
    example: false,
  })
  isTaxable: boolean;

  @ApiProperty({
    description: "Type of the earning (Fixed or Percentage)",
    example: EarningTypes.Fixed,
    enum: EarningTypes,
    required: true,
  })
  @IsEnum(EarningTypes)
  @IsNotEmpty()
  type: EarningTypes;

  @IsBoolean()
  @ApiProperty({
    description: "Indicate if earning type is read only.",
    example: false,
  })
  isReadOnly: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Description of the eanring type",
    example: "The  fixed salary of the earnign  type.",
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Indicate the name of earning type.",
    example: "Basic Salary",
  })
  earningTypeName: string;

  @IsBoolean()
  @ApiProperty({
    description: " Indicate if earning type is Leave Without Pay (LWP)",
    example: false,
  })
  isLwp: boolean;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: "Id of the parent earning type , this is parcent of.",
    example: 1,
    nullable: true,
  })
  isPercentOf: number;
}

export class updateEarningTypeDto extends CreateEarningTypeDto {}

export class paginationResultDto<T> {
  @ApiProperty({ type: [Object], description: "pagination result" })
  data: T[];

  @ApiProperty({ type: Object, description: "Pagination meta data" })
  meta: {
    totalItems: number;
    itemCount: number;
    itemPerPgae: number;
    totalPage: number;
    customPage: number;
  };
}
