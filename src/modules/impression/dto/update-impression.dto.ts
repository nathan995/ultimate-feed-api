import { PartialType } from '@nestjs/swagger';
import { CreateImpressionDto } from './create-impression.dto';

export class UpdateImpressionDto extends PartialType(CreateImpressionDto) {}
