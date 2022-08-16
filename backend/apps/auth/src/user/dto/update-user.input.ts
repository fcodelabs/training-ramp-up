import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    password: string

    @Field({ nullable: true })
    hashedRefreshToken: string;

}
