enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

interface Student {
  dbId: number | undefined;
  keyId: number | null;
  id: number | null;
  name: string | null;
  gender: string | null;
  address: string | null;
  mobileNo: string | null;
  birthday: Date | null;
  age: number | null;
}

export { Gender };
export type { Student };
