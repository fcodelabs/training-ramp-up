import * as React from "react"
export default function MyCommandCell(){
    return(
        <td className="k-command-cell">
            <button style={{background:"#ef4444",color:"#fff"}} className="k-button k-button-md k-rounded-md">Edit</button>
            <button className="k-button k-button-md k-rounded-md">Remove</button>
        </td>
    )
}