import { useState } from 'react'
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import {Student} from '../../../../utils/types'
import { useAppSelector, useAppDispatch } from "../../../../hooks";
import {addNew, editData} from "../../studentSlice";
import {getStoreData} from '../../../../utils/StudentFunctions'



export const DropDown2 = (props: {
    gender: string
}) => {

    const {data,editId}=getStoreData();
    const [genderState, setGenderState] = useState(props.gender)
    const dispatch = useAppDispatch();


    const handleChange = (event: DropDownListChangeEvent) => {
        setGenderState(event.target.value)
        const newData = data.map((item) => {
            return item.id === editId ? { ...item, gender: event.value} : item
        });
        // const newData:SerializedStudent[]=[];
        // data.forEach(
        //     (item)=>{
        //         if(item.id===editId){
        //             item.gender = event.value;
        //         }
        //         newData.push(item);
        //     }
        // );
        dispatch(
            editData(newData)
        );

    }

    return <DropDownList data={['male', 'female']} value={genderState} onChange={handleChange} />
}
