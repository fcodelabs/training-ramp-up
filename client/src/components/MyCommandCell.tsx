export default function MyCommandCell(props:any){
    const {dataItem,role} = props;
    const inEdit = dataItem[props.editField]
    const isNewItem = dataItem.id === undefined;
    return inEdit ? 
        (
            <td className="k-command-cell">
                <button style={{background:'#ef4444',color:'#fff',padding:"5px 15px", border:"1px solid #ef4444",borderRadius:"5px", fontWeight:"bold", margin:"2px", textTransform:"uppercase"}} disabled={role==="ADMIN"?false:true} onClick={()=>isNewItem?props.add(dataItem):props.update(dataItem)}>
                    {isNewItem ? 'Add' : 'Update'}
                </button>
                <button style={{background:'#ffffff',padding:"5px 15px", border:"1px solid black",borderRadius:"5px", fontWeight:"bold", margin:"2px",textTransform:"uppercase"}} disabled={role==="ADMIN"?false:true} onClick={()=>isNewItem ? props.discard():props.cancel(dataItem)}>
                    {isNewItem ? 'Discard' : 'Cancel'}
                </button>
            </td>
        )
            :
        (
            <td className="k-command-cell">
                <div className="">
                    <button style={{background:'#ef4444',color:'#fff',padding:"5px 15px", border:"1px solid #ef4444",borderRadius:"5px", fontWeight:"bold", margin:"2px",textTransform:"uppercase"}} disabled={role==="ADMIN"?false:true} onClick={()=>props.edit(dataItem)}>
                        Edit
                    </button>
                    <button style={{background:'#ffffff',padding:"5px 15px", border:"1px solid black",borderRadius:"5px", fontWeight:"bold", margin:"2px",textTransform:"uppercase"}} disabled={role==="ADMIN"?false:true} onClick ={()=>props.remove(dataItem)}>
                        Remove
                    </button>
                </div>
            </td>
        )
}