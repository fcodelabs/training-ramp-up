import {pageCallBack, Student} from "../../../../utils/types";
import {AppDispatch} from "../../../../store";
import {GridCellProps} from "@progress/kendo-react-grid";
import {calculateAge, discard, edit, execute, remove,cancel} from "../../../../utils/studentFunctions";
import {DropDown2} from "../dropdown/DropDown2";

export const command = (dataIndex: number, editId: number | null, newAdded: boolean, data: Student[], dispatch: AppDispatch,setPage:pageCallBack) => {
    return (
        <td className='k-command-cell'>
            {dataIndex === editId && newAdded && (
                <div className='table--button--group'>
                    <button
                        onClick={() => {
                            execute(editId,
                                data,
                                newAdded,
                                dispatch,
                                setPage
                            )
                        }}
                        className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
                    >
                        Add
                    </button>
                    <button
                        onClick={() => {
                            discard(data, editId, dispatch);
                        }}
                        className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
                    >
                        Discard Changes
                    </button>
                </div>
            )}

            {dataIndex === editId && !newAdded && (
                <div className='table--button--group'>
                    <button
                        onClick={() => {
                            execute(editId,
                                data,
                                newAdded,
                                dispatch,
                                setPage
                            )
                        }}
                        className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
                    >
                        Update
                    </button>
                    <button
                        onClick={() => {
                            cancel( dispatch);
                        }}
                        className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
                    >
                        Cancel
                    </button>
                </div>
            )}

            {dataIndex !== editId && (
                <div className='table--button--group'>
                    <button
                        onClick={() => {
                            edit(newAdded, dispatch, dataIndex)
                        }}
                        className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-save-command'
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            remove(data, dataIndex,dispatch);
                        }}
                        className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
                    >
                        Remove
                    </button>
                </div>
            )}
        </td>
    )
}

export const calcAge = (props: GridCellProps) => {
    let age = null
    if (props.dataItem.dateOfBirth) {
        age = calculateAge(new Date(props.dataItem.dateOfBirth))
        if (age < 0) {
            age = null
        }
    }
    return <td>{age}</td>
}

export const gender = (gender: string) => {
    return (
        <td>
            <DropDown2 gender={gender}/>
        </td>
    )
}


