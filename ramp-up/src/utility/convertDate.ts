
const convertDate = (dob: string) => {
    const DOB = new Date(dob);
    const diff = Date.now() - DOB.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
export default convertDate;