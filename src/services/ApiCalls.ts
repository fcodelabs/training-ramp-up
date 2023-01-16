import { publicRequest } from "../utils/requestMethods"

const addNewPersonData = async (newMsg: {
  name: any
  title: any
  description: any
  colour: any
  time: any
}) => {
 try {
    const res = await publicRequest.get(`/user`, user);
    console.log(res.data);
    
  } catch (err) {
   return err;
  }
}