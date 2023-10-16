
export default function reducer(state = [], action: any){
    let lastId = 0
    switch(action.type){
        case "Add":
            return[
                ...state,
                {
                    id: ++lastId,
                    name: action.payload.name,
                    gender:action.payload.gender,
                    address:action.payload.address,
                    mobileNo:action.payload.mobileNo,
                    dateOfBirth:action.payload.dateOfBirth,
                    age:action.payload.age,
                }
            ];
        case "Edit":
            return [
                state => state.id === action.payload.id ? {
                    id: ++lastId,
                    name: action.payload.name,
                    gender:action.payload.gender,
                    address:action.payload.address,
                    mobileNo:action.payload.mobileNo,
                    dateOfBirth:action.payload.dateOfBirth,
                    age:action.payload.age,
                } : state
            ];
        case "Remove":
            return state.filter(student =>student.id !== action.payload.id);
        default:
            return state;
    }
}