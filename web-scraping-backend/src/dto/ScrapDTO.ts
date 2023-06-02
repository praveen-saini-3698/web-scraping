import { IsNotEmpty, IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

class LogoColorDTO {
    R?: number | string;
    G?: number | string;
    B?: number | string;
}

export class CreatScrapDTO {

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url?: string;

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    keywords?: string;

    @IsString()
    @IsOptional()
    typography?: string[];

    @IsString()
    @IsOptional()
    logo?: string;

    @IsArray()
    @IsOptional()
    logoColors?: LogoColorDTO[];

}