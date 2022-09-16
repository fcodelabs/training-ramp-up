import React from "react"
import { DatePicker } from '@progress/kendo-react-dateinputs';

export default function DateCell(props:any){
    console.log('date cell props',props);
    return props.dataItem.inEdit?(<td>
        <DatePicker
          width="100%"
          value={props.dataItem[props.field]}
          format="yyyy-MM-dd"
          onChange={(e) => props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value
          })}
        />
      </td>) :<td>{new Date(props.dataItem.dob).toDateString()}</td>
;
}