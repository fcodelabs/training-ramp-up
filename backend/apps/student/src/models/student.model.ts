import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Student {
    // type definitions
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    gender: string;

    @Field()
    address: string;

    @Field()
    mobileNo: string;

    @Field(type => Date)
    dateOfBirth: Date;

    @Field()
    inEdit: boolean;

    @Field(type => Int)
    age: number;

}