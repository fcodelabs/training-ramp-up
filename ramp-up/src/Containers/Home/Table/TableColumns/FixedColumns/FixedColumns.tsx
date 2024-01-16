import { GridColDef } from '@mui/x-data-grid';
import { formatMobileDisplay } from '../../../../../Utilities/formatMobileText';
import 'react-phone-number-input/style.css';
import EditableCell from './EditCells/EditCells';
import { Header } from './Headers/Headers';
import { validateAddress, validateAge, validateBirthday, validateMobile, validateName } from '../../../../../Utilities/ValidateUser';
import formatDate from '../../../../../Utilities/formatDate';

const genders = ['Male', 'female', 'other'];

export const FixedColumns: GridColDef[] = [

    {
        field: 'uid', headerName: 'ID', type: 'number', width: 10, editable: false, sortable: false,
        renderHeader: () => <div style={{ paddingRight: '50px' }}>ID</div>
    },
    {
        field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 50, editable: true, sortingOrder: ['desc', 'asc'],
        renderHeader: () => { return (<Header text='name' />) },
        renderEditCell: (params) => { return <EditableCell params={params} field="name" value={params.value} validate={validateName} />; }
    },
    {
        field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true,
        renderEditCell: (params) => { return <EditableCell params={params} field="gender" value={params.value} validate={() => true} options={genders} />; },
    },
    {
        field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => { return <EditableCell params={params} field="address" value={params.value} validate={validateAddress} />; }
    },
    {
        field: 'mobile', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => {
            return <EditableCell params={params} field="mobile" value={params.value} validate={validateMobile} />;
        },
        renderCell: (params) => {
            const formattedMobile = formatMobileDisplay(params.value);
            return <div>{formattedMobile}</div>;
        },
    },
    {
        field: 'birthday', headerName: 'Date of Birth', type: 'string', flex: 1, minWidth: 100, editable: true, sortingOrder: ['desc', 'asc'],
        renderHeader: () => { return (<Header text='Birthday' />) },
        renderCell: (params) => {
            const formattedDate = formatDate(params.value);
            return (<div> {formattedDate} </div>);
        },
        renderEditCell: (params) => { return <EditableCell params={params} field="birthday" value={params.value} validate={validateBirthday} />; },
    },
    {
        field: 'age', headerName: 'Age', type: 'number', flex: 0.4, minWidth: 40, sortable: false, editable: true,
        renderHeader() { return (<Header text='Age' />) },
        renderEditCell: (params) => { return (<EditableCell params={params} field="age" value={params.value} validate={validateAge} />); },
    }

]



