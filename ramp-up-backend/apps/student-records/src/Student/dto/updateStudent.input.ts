import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStudentDTO {
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

  @Field(()=>Date)
  DOB: Date;

  @Field(()=>Int)
  age: number;

  @Field()
  isArchive: boolean;
}
