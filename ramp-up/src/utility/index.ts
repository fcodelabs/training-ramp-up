export function formatMobile(mobile: string){
    const mobileWithoutPlus = mobile.replace(/^\+94/, "0");
    const formattedMobile = mobileWithoutPlus.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3",
    );
    return formattedMobile;
}

export const convertDate = (dob: string) => {
    const DOB = new Date(dob);
    const diff = Date.now() - DOB.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

export const validateMobile = (value: string) => {
    const mobileRegex = /^(?:\+94|0)\d{9}$/;
    return mobileRegex.test(value);
  };

export function isValidEmail(email : string) {
  const regex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function validatePassword (password: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
  