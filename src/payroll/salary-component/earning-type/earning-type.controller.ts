import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { use } from "passport";
import { User } from "src/common/decorators/user.decorator";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { UserModel } from "src/user/models/user.model";
import {
  CreateEarningTypeDto,
  updateEarningTypeDto,
} from "./dto/earning-type.dto";
import { EarningTypeService } from "./earning-type.service";

@Controller("payroll/earning-type")
@ApiTags("payroll/earning-type")
@ApiBearerAuth()
export class EarningTypeController {
  private readonly logger = new Logger(EarningTypeController.name);
  constructor(private readonly earningTypeService: EarningTypeService) {}

  @ApiOperation({
    description: "Create earning type.",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully created.",
  })
  @Post()
  async create(
    @User() user: UserModel,
    @Body() createEarningTypeDto: CreateEarningTypeDto,
  ) {
    this.logger.log(`Earning type is being created by ${user.employeeId}`);
    return this.earningTypeService.createEarningType(
      user,
      createEarningTypeDto,
    );
  }

  @ApiOperation({
    description: "List earning types by id.",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully fetched.",
  })
  @Get(":earningTypeId")
  async findOne(@User() user: UserModel, @Param("earningTypeId") id: string) {
    return this.earningTypeService.findOne(Number(id), user);
  }

  @Get()
  @ApiOperation({
    description: "List all earning types.",
  })
  @ApiResponse({
    status: 200,
    description: "List of earning types",
  })
  @ApiQuery({
    name: "search",
    required: false,
    description: "Search by employee number or display name.",
  })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query("search") search: string,
  ) {
    return this.earningTypeService.findAllEarningType(paginationDto, search);
  }

  @Patch(":earningTypeId")
  @ApiParam({
    name: "earningTypeId",
    description: "Earning type id is required to update the component.",
  })
  async update(
    @User() user: UserModel,
    @Param("earningTypeId") id: string,
    @Body() updateEarningTypeDto: updateEarningTypeDto,
  ) {
    this.logger.log(
      `Earning Type - ${id} is being updated by user : ${user.employeeId}`,
    );
    return this.earningTypeService.updateEarningTypeDto(
      Number(id),
      updateEarningTypeDto,
      user,
    );
  }

  @Delete(":earningTypeId")
  @ApiParam({
    name: "earningTypeId",
    description: "Earning type Id is required to delete",
  })
  async delete(@User() user: UserModel, @Param("earningTypeId") id: string) {
    this.logger.log(`Earning Type - ${id} is deleted successfully.`);
    return this.earningTypeService.delete(Number(id), user);
  }
}
