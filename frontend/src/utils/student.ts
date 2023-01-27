enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

type Student = {
  keyId: number | null;
  id: number | null;
  name: string | null;
  gender: string | null;
  address: string | null;
  mobileNo: string | null;
  birthday: Date;
  age: number | null;
  isAdding: boolean;
  isEditing: boolean;
  inEdit: boolean;
};

export { Gender };
export type { Student };