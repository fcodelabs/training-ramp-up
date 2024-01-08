import { GridColDef } from '@mui/x-data-grid';
import { formatMobileDisplay } from '../../../../../Utilities/formatMobileText';
import 'react-phone-number-input/style.css';
import { NameEditCell, NameHeader } from './NameColumn/NameColumn';
import GenderEditCell from './GenderColumn/GenderColumn'
import AddressEditCell from './AddressColumn/AddressColumn';
import MobileEditCell from './MobileColumn/MobileColumn';
import { BirthdayCell, BirthdayEditCell, BirthdayHeader } from './BirthdayColumn/BirthdayColumn';
import { Age, AgeEditCell } from './AgeColumn/AgeColumn';

const genders = ['Male', 'female', 'other'];

export const FixedColumns: GridColDef[] = [

    {
        field: 'uid', headerName: 'ID', type: 'number', width: 10, editable: false, sortable: false,
        renderHeader: () => <div style={{ paddingRight: '50px' }}>ID</div>
    },
    {
        field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 50, editable: true, sortingOrder: ['desc', 'asc'],
        renderHeader: () => { return (<NameHeader />) },
        renderEditCell: (params) => { return (<NameEditCell params={params} />) }
    },
    {
        field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true,
        renderEditCell: (params) => { return (<GenderEditCell params={params} />) },
    },
    {
        field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => { return (<AddressEditCell params={params} />) }
    },
    {
        field: 'mobile', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => { return (<MobileEditCell params={params} />) },
        renderCell: (params) => {
            const formattedMobile = formatMobileDisplay(params.value);
            return <div>{formattedMobile}</div>; },
    },
    {
        field: 'birthday', headerName: 'Date of Birth', type: 'string', flex: 1, minWidth: 100, editable: true, sortingOrder: ['desc', 'asc'],
        renderHeader: () => { return (<BirthdayHeader />) },
        renderCell: (params) => { return (<BirthdayCell params={params} />) },
        renderEditCell: (params) => { return (<BirthdayEditCell params={params} />) },
    },
    {
        field: 'age', headerName: 'Age', type: 'number', flex: 0.4, minWidth: 40, sortable: false, editable: true,
        renderHeader() { return (<Age/>)  },
        renderEditCell: (params) => { return (<AgeEditCell params={params} />) },
    }

]



