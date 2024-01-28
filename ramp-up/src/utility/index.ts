export function formatMobile(mobile: string){
    const mobileWithoutPlus = mobile.replace(/^\+/, "");
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
  