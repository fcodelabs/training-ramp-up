import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserCreateDto {
    @Field()
    email: string;

    @Field()
    password: string

    @Field()
    isArchive: boolean;

}
