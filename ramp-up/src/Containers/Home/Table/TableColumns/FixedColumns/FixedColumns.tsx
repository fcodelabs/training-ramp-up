import { GridColDef } from '@mui/x-data-grid';
import { formatMobileDisplay } from '../../../../../Utilities/formatMobileText';
import 'react-phone-number-input/style.css';
import GenderEditCell from './GenderColumn/GenderColumn'
import MobileEditCell from './MobileColumn/MobileColumn';
import { BirthdayCell, BirthdayEditCell, BirthdayHeader } from './BirthdayColumn/BirthdayColumn';
import { Age, AgeEditCell } from './AgeColumn/AgeColumn';
import EditableCell from './EditCellsHelper';
import { Header } from './Headers';
import { validateAddress, validateName } from '../../../../../Utilities/ValidateUser';

const genders = ['Male', 'female', 'other'];

export const FixedColumns: GridColDef[] = [

    {
        field: 'uid', headerName: 'ID', type: 'number', width: 10, editable: false, sortable: false,
        renderHeader: () => <div style={{ paddingRight: '50px' }}>ID</div>
    },
    {
        field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 50, editable: true, sortingOrder: ['desc', 'asc'],
        renderHeader: () => { return (<Header text='name'/>) },
        renderEditCell: (params) => { return <EditableCell params={params} field="name" value={params.value} validate={validateName} />;}
    },
    {
        field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true,
        renderEditCell: (params) => { return (<GenderEditCell params={params} />) },
    },
    {
        field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => { return <EditableCell params={params} field="address" value={params.value} validate={validateAddress} />; }
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



