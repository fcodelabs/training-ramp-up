export const ageCalculator = (dateOfBirth: any) => {
  const dateOfbirth = new Date(dateOfBirth);

  const today = new Date();
  const age =
    today.getFullYear() -
    dateOfbirth.getFullYear() -
    (today.getMonth() < dateOfbirth.getMonth() ||
    (today.getMonth() === dateOfbirth.getMonth() &&
      today.getDate() < dateOfbirth.getDate())
      ? 1
      : 0);
  return age;
};
