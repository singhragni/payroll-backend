import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @ApiPropertyOptional({
    description: "Page number for pagination.",
    default: 1,
    required: false,
  })
  @IsInt({ message: "Page number must be an intger" })
  @Min(1, { message: "Page number must be at least 1" })
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional({
    description: "limit of items per page",
    default: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;
}
