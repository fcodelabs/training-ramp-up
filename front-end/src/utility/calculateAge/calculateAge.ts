export function calculateAge(birthdate: any): number {
    const dateOfbirth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - dateOfbirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfbirth.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfbirth.getDate())) {
      age--;
    }
  
    return age;
  }
  
    export default calculateAge;