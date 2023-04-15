import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsPositive, IsString, MinLength } from "class-validator"; // Docs: https://github.com/typestack/class-validator

export class CreateTicketDto {
    @IsString()
    @MinLength(1)
    @Transform(({ value }: TransformFnParams) => value?.trim()) // porsiacaso envian un campo vacíó
    name: string;

    @IsEmail()
    email: string;

    @IsInt()
    @IsPositive()
    price: number;

    @IsBoolean()
    active: boolean;
}
