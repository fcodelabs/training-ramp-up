import React from 'react';
import EditableCell from './EditCellsHelper';
import { validateAddress, validateName } from '../../../../../Utilities/ValidateUser';
import { genders } from '../../../../../Utilities/TableStyles';

const NameEditCell: React.FC<{ params: any }> = ({ params }) => {
  return <EditableCell params={params} field="name" value={params.value} validate={validateName} />;
};

const AddressEditCell: React.FC<{ params: any }> = ({ params }) => {
    return <EditableCell params={params} field="address" value={params.value} validate={validateAddress} />;
  };

const GenderEditCell: React.FC<{ params: any }> = ({ params }) => {
    return <EditableCell params={params} field="gender" value={params.value} validate={() => true} options={genders} />;
  };
  
  


export { NameEditCell, AddressEditCell, GenderEditCell };