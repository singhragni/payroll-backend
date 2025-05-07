import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { use } from "passport";
import { EarningTypeEntity } from "src/common/entities/earning-component.entity";
import { EarningTypes } from "src/common/entities/enum/earning-component.enum";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { UserModel } from "src/user/models/user.model";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import {
  CreateEarningTypeDto,
  paginationResultDto,
  updateEarningTypeDto,
} from "./dto/earning-type.dto";

@Injectable()
export class EarningTypeService {
  private readonly logger = new Logger(EarningTypeService.name);
  constructor(
    @InjectRepository(EarningTypeEntity)
    private earningTypeRepo: Repository<EarningTypeEntity>,
  ) {}

  async createEarningType(
    user: UserModel,
    createEarningType: CreateEarningTypeDto,
  ): Promise<EarningTypeEntity> {
    this.logger.log(`create earning request:`, CreateEarningTypeDto);

    const { type } = createEarningType;
    const { employeeId } = user;
    const existingEarningTYpe = await this.earningTypeRepo.findOne({
      where: {
        earningTypeName: createEarningType.earningTypeName,
        isActive: true,
      },
    });

    if (existingEarningTYpe)
      throw new ConflictException(`Earning Type Name already exist`);

    const isPercentage = type === EarningTypes.Percentage;

    if (isPercentage && !createEarningType.isPercentOf)
      throw new NotFoundException(`Earning type of percentage is required.`);

    const earningType = this.earningTypeRepo.create({
      ...createEarningType,
      isPercentOf: isPercentage ? createEarningType.isPercentOf : null,
      createdBy: employeeId,
      modifiedBy: employeeId,
    });

    this.logger.log(`Earning type has been created succesfully.`);
    return this.earningTypeRepo.save(earningType);
  }

  async findAllEarningType(
    pagination: PaginationDto,
    search: string,
  ): Promise<paginationResultDto<EarningTypeEntity>> {
    const skip = (pagination.page - 1) * pagination.limit;

    const whereOption: FindOptionsWhere<EarningTypeEntity> = {
      isActive: true,
    };
    if (search) whereOption.earningTypeName = ILike(`%${search}%`);

    const [result, total] = await this.earningTypeRepo.findAndCount({
      where: whereOption,
      relations: {
        percentEarning: true,
      },
      take: pagination.limit,
      skip: skip,
    });

    return {
      data: result,
      meta: {
        totalItems: total,
        itemCount: result.length,
        itemPerPgae: pagination.limit,
        totalPage: Math.ceil(total / pagination.limit),
        customPage: pagination.page,
      },
    };
  }

  async delete(
    earningTypeId: number,
    user: UserModel,
  ): Promise<EarningTypeEntity> {
    const earningType = await this.earningTypeRepo.findOne({
      where: {
        id: earningTypeId,
        isActive: true,
      },
    });

    if (!earningType) throw new NotFoundException(`Earning type mot found.`);
    earningType.isActive = false;
    earningType.modifiedBy = user.employeeId;

    this.logger.log(
      `Earning type Id - ${earningTypeId} is deleted successfully.`,
    );
    return this.earningTypeRepo.save(earningType);
  }

  async updateEarningTypeDto(
    earningTypeId: number,
    updateEarningTypeDto: updateEarningTypeDto,
    user: UserModel,
  ): Promise<EarningTypeEntity> {

    this.logger.log(`updating earning type ID ${earningTypeId} by user ${user.employeeId}`);
    const { earningTypeName, type } = updateEarningTypeDto;
    const existEarningType = await this.earningTypeRepo.findOne({
      where: {
        id: earningTypeId,
        isActive: true,
      },
    });

    if (!existEarningType)
      throw new NotFoundException(`Earning type not fonud`);

    if (existEarningType.isReadOnly)
      throw new BadRequestException(
        `Update are not allowed in this earning type`,
      );

    if (
      existEarningType.earningTypeName !== updateEarningTypeDto.earningTypeName
    ) {
      const isNameExist = await this.earningTypeRepo.findOne({
        where: {
          earningTypeName,
        },
      });

      if (isNameExist)
        throw new BadRequestException(
          ` Earning type name , ${earningTypeName} already exist , Please try again.`,
        );
    }
    const isPercentage = type === EarningTypes.Percentage;
    return this.earningTypeRepo.save({
      ...updateEarningTypeDto,
      ...existEarningType,
      isPercentOf: isPercentage ? updateEarningTypeDto.isPercentOf : null,
      modifiedBy: user.employeeId,
    });
  }

  async findOne(
    id: number,
    user: UserModel,
  ): Promise<EarningTypeEntity | null> {
    const isEarningTypeExist = this.earningTypeRepo.findOne({
      where: {
        id,
        isActive: true,
      },
    });
    if (!isEarningTypeExist)
      throw new NotFoundException(`Earning type not found`);

    return isEarningTypeExist;
  }
}
