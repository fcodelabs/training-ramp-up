type Student ={
  id:number,name:String,gender:String,address:String,mobileNo:number,dob:String,age:number
}
type StudentData ={
  name:String,gender:String,address:String,mobileNo:number,dob:String,age:number
}

//dummy data for testing API endpoints
const dummy_data : Student[] = [
    {
      id:1,
      name:"Shane",
      gender:"male",
      address:"Homagama",
      mobileNo:112748768,
      dob:"9/14/2001",
      age:25
    },
    {
      id:2,
      name:"Ishara",
      gender:"male",
      address:"Homagama",
      mobileNo:116748768,
      dob:"9/14/1996",
      age:24
    },
    {
      id:3,
      name:"Ishara",
      gender:"male",
      address:"Kottawa",
      mobileNo:126748767,
      dob:"9/14/2003",
      age:24
    },
    {
      id:4,
      name:"Jay",
      gender:"male",
      address:"Kottawa",
      mobileNo:126746777,
      dob:"9/14/1999",
      age:27
    },
    {
      id:5,
      name:"Jay",
      gender:"male",
      address:"Moratuwa",
      mobileNo:1126645777,
      dob:"9/14/1996",
      age:27
    },
    {
      id:6,
      name:"Jay",
      gender:"male",
      address:"Dehiwala",
      mobileNo:1126641797,
      dob:"9/14/1998",
      age:27
    },
    {
      id:7,
      name:"Jay",
      gender:"male",
      address:"Kotuwa",
      mobileNo:1116641597,
      dob:"9/14/1997",
      age:27
    },
    {
      id:8,
      name:"Jay",
      gender:"male",
      address:"Kotuwa",
      mobileNo:1216641598,
      dob:"9/14/2000",
      age:20
    }
]

export {Student,StudentData,dummy_data}