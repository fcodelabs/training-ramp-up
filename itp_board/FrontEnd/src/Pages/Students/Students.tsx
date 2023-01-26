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
import {useEffect, useMemo, useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {orderBy, SortDescriptor} from '@progress/kendo-data-query'
import {PageState, SockeResponse} from "../../utils/types";

import {io} from 'socket.io-client'

const socket = io('http://localhost:4000')

import {studentData} from '../../dummy'
import {calcAge, gender, addRecord, getStoreData, command} from '../../utils/StudentFunctions'
import {useAppSelector, useAppDispatch} from "../../hooks";
import {addNew, changeEditId, changeNewAdded, changeSort, editData, startGetData} from "./studentSlice";
import {displayErrors, displayNotifications} from "../../utils/toasts";


const Student = () => {
    const initialSort: Array<SortDescriptor> = [
        {
            field: 'id',
            dir: 'asc',
        },
    ]
    const initialPageState: PageState = {skip: 0, take: 10}
    const [page, setPage] = useState(initialPageState)
    const [notification, setNotification] = useState('');
    const [previousNotification, setPreviousNotification] = useState('');
    const {data, editId, newAdded, sort, dispatch} = getStoreData();


    useEffect(
        ()=>{

            if(notification!=='' && notification!==previousNotification){
                displayNotifications(notification);
                setPreviousNotification(notification);
            }
        },
        [notification]
    )

    useEffect(() => {
        dispatch(startGetData())
        socket.on('new_student_added', (response: SockeResponse) => {
            setNotification(`New Student added with the id:${response.id}`)
            dispatch(startGetData());
        })
        socket.on('student_edited', (response: SockeResponse) => {
            setNotification(`Student data edited with the id:${response.id}`)
            dispatch(startGetData());

        })
        socket.on('student_deleted', (response: SockeResponse) => {
            console.log(response);
            setNotification(`Student data deleted with the id:${response}`)
            dispatch(startGetData());

        })

    }, [socket])

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
                        return command(props.dataItem.id, editId, newAdded, data, dispatch,setPage)
                    }}
                    className='k-text-center'
                />
            </Grid>
        </>
    )
}

export default Student
