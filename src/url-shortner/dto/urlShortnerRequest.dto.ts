import { IsString } from 'class-validator';

export class UrlShortnerRequestDto {
  @IsString()
  url: string;
}
