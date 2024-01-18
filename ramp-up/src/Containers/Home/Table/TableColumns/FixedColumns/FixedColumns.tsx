import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { formatMobileDisplay } from '../../../../../Utilities/formatMobileText'
import 'react-phone-number-input/style.css'
import EditableCell from './EditCells/EditCells'
import { Header } from './Headers/Headers'
import {
    validateAddress,
    validateAge,
    validateBirthday,
    validateMobile,
    validateName,
} from '../../../../../Utilities/ValidateUser'
import formatDate from '../../../../../Utilities/formatDate'
import { Skeleton } from '@mui/material'

const genders = ['Male', 'female', 'other']

export const FixedColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        flex: 0.2,
        editable: false,
        sortable: false,
        renderHeader: () => <Header text='ID'/>,
        renderCell: (params) => {
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={50}
                        />{' '}
                    </div>
                )
            return <div>{params.value}</div>
        },
    },
    {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 165,
        editable: true,
        sortable:true,
        sortingOrder: ['desc', 'asc'],
        renderHeader: () => {
            return <Header text="name" />
        },
        renderEditCell: (params) => {
            return (
                <EditableCell
                    params={params}
                    field="name"
                    value={params.value}
                    validate={validateName}
                />
            )
        },
        renderCell: (params) => {
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={100}
                        />{' '}
                    </div>
                )
        },
    },
    {
        field: 'gender',
        headerName: 'Gender',
        type: 'singleSelect',
        width: 165,
        valueOptions: genders,
        sortable: false,
        editable: true,
        renderEditCell: (params) => {
            return (
                <EditableCell
                    params={params}
                    field="gender"
                    value={params.value}
                    validate={() => true}
                    options={genders}
                />
            )
        },
        renderCell: (params) => {
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={100}
                        />{' '}
                    </div>
                )
        },
        valueGetter(params) {
            return params.value || 'Male'
        },
    },
    {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        minWidth: 165,
        sortable: false,
        editable: true,
        renderEditCell: (params) => {
            return (
                <EditableCell
                    params={params}
                    field="address"
                    value={params.value}
                    validate={validateAddress}
                />
            )
        },
        renderCell: (params) => {
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={100}
                        />{' '}
                    </div>
                )
        },
    },
    {
        field: 'mobile',
        headerName: 'Mobile No.',
        type: 'string',
        width: 165,
        sortable: false,
        editable: true,
        renderEditCell: (params) => {
            return (
                <EditableCell
                    params={params}
                    field="mobile"
                    value={params.value}
                    validate={validateMobile}
                />
            )
        },
        renderCell: (params) => {
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={100}
                        />{' '}
                    </div>
                )
            const formattedMobile = formatMobileDisplay(params.value)
            return <div>{formattedMobile}</div>
        },
    },
    {
        field: 'birthday',
        headerName: 'Date of Birth',
        type: 'string',
        minWidth: 165,
        editable: true,
        sortingOrder: ['desc', 'asc'],
        renderHeader: () => {
            return <Header text="Birthday" />
        },
        renderCell: (params) => {
            const formattedDate = formatDate(params.value)
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={100}
                        />{' '}
                    </div>
                )
            return <div> {formattedDate} </div>
        },
        renderEditCell: (params) => {
            return (
                <EditableCell
                    params={params}
                    field="birthday"
                    value={params.value}
                    validate={validateBirthday}
                />
            )
        },
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        flex:1,
        width: 75,
        sortable: false,
        editable: true,
        renderHeader() {
            return <Header text="Age" />
        },
        renderCell: (params) => {
            if (params.row.error)
                return (
                    <div>
                        {' '}
                        <Skeleton
                            animation="wave"
                            height={20}
                            width={50}
                        />{' '}
                    </div>
                )
        },
        renderEditCell: (params) => {
            return (
                <EditableCell
                    params={params}
                    field="age"
                    value={params.value}
                    validate={validateAge}
                />
            )
        },

    },
]
