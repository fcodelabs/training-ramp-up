// GridActionsColumn.tsx

import * as React from 'react';
import Button from '@mui/material/Button';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';

interface Props {
    id: GridRowId;
    isInEditMode: boolean;
    handleSaveClick: () => void;
    handleCancelClick: () => void;
    handleEditClick: () => void;
    handleDeleteClick: () => void;
  }

const GridActionsColumn: React.FC<Props> = ({ id, isInEditMode, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick }) => {
    if (isInEditMode) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <GridActionsCellItem
                    icon={<Button variant='outlined'>Add</Button>}
                    label="Save"
                    sx={{
                        color: 'primary.main',
                    }}
                    onClick={handleSaveClick}
                />
                <GridActionsCellItem
                    icon={<Button variant='outlined' color='error'>Discard Changes</Button>}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick}
                    color="inherit"
                />
            </div>
        );
    }

    return (
        <>
            <GridActionsCellItem
                icon={<Button variant='outlined'>Edit</Button>}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick}
                color="inherit"
            />
            <GridActionsCellItem
                icon={<Button variant='outlined' color='error'>Remove</Button>}
                label="Remove"
                onClick={handleDeleteClick}
                color="inherit"
            />
        </>
    );
};

export default GridActionsColumn;
