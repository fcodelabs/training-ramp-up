/* eslint-disable react/prop-types */
import '@progress/kendo-theme-default/dist/all.css'

import {
    GridItemChangeEvent,
    Grid,
    GridColumn,
    GridToolbar,
    GridCellProps,
    GridSortChangeEvent,
    GridPageChangeEvent,
} from '@progress/kendo-react-grid'
import '../../App.css'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { orderBy } from '@progress/kendo-data-query'
import { PageState, SockeResponse } from '../../utils/types'
import { addRecord, getStoreData } from '../../utils/studentFunctions'
import { changeSort, editData, startGetData } from './studentSlice'
import { displayNotifications } from '../../utils/toasts'

import { io } from 'socket.io-client'
import {command, gender,calcAge} from "./components/cellComponent/CellComponent";
const socket = io('http://localhost:4000')



const Student = () => {

    const initialPageState: PageState = {skip: 0, take: 10}
    const [page, setPage] = useState(initialPageState)
    const {data, editId, newAdded, sort,admin, dispatch} = getStoreData();


    useEffect(() => {
        // localStorage.setItem("userProfile", JSON.stringify("Yasith"));
        dispatch(startGetData());
    }, []);


    socket.off('student_deleted').on('student_deleted', (response: SockeResponse) => {
        displayNotifications(`Student data deleted with the id:${response}`);
        dispatch(startGetData());
    })

    socket.off('new_student_added').on('new_student_added', (response: SockeResponse) => {
        displayNotifications(`New Student added with the id:${response.id}`)
        dispatch(startGetData());
    })

    socket.off('student_edited').on('student_edited', (response: SockeResponse) => {
        displayNotifications(`Student data edited with the id:${response}`)
        dispatch(startGetData());
    })



    const pageChange = (event: GridPageChangeEvent) => {
        setPage(event.page);
    }

    const itemChange = (event: GridItemChangeEvent) => {
        const field = event.field || ''
        const newData = data.map((item) => {
            return item.id === editId ? {...item, [field]: event.value} : item
        })
        // setData(newData)
        dispatch(
            editData(newData)
        );
    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <Grid
                data={
                    orderBy(data.map((record) => {
                        return ({
                            ...record,
                            inEdit: record.id === editId,
                            dateOfBirth: record.dateOfBirth && new Date(record.dateOfBirth)

                        });
                    }).slice(page.skip, page.take + page.skip), sort)}
                editField='inEdit'
                onItemChange={itemChange}
                sortable={true}
                sort={sort}
                onSortChange={(e: GridSortChangeEvent) => {
                    dispatch(changeSort(e.sort));
                }}
                pageable={true}
                skip={page.skip}
                take={page.take}
                total={data.length}
                onPageChange={pageChange}
            >
                <GridToolbar>
                    <div>
                        <button
                            title='Add new'
                            className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-light'
                            disabled={!admin}
                            onClick={
                                () => {
                                    addRecord(data, newAdded, dispatch, setPage)
                                }
                            }
                        >
                            Add new
                        </button>
                    </div>
                </GridToolbar>
                <GridColumn field='id' title='ID' editable={false}/>
                <GridColumn field='name' title='Name'/>
                <GridColumn
                    field='gender'
                    title='Gender'
                    cell={(props: GridCellProps) => {
                        return gender(props.dataItem.gender)
                    }}
                />
                <GridColumn field='address' title='Address'/>
                <GridColumn field='mobileNo' title='Mobile No'/>
                <GridColumn editor='date' format='{0:D}' field='dateOfBirth' title='Date of Birth'/>
                <GridColumn
                    field='age'
                    title='Age'
                    cell={calcAge}
                />
                <GridColumn
                    field='command'
                    title='Command'
                    cell={(props: GridCellProps) => {
                        return command(props.dataItem.id, editId, newAdded, data, dispatch,setPage,admin)
                    }}
                    className='k-text-center'
                />
            </Grid>
        </>
    )
}

export default Student
