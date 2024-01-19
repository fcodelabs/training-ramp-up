import * as React from 'react'
import Button from '@mui/material/Button'
import { GridActionsCellItem, GridRenderEditCellParams } from '@mui/x-data-grid'
import styled from 'styled-components'

interface Props {
    params: GridRenderEditCellParams
    isInEditMode: boolean
    handleSaveClick: () => void
    handleCancelClick: () => void
    handleEditClick: () => void
    handleDeleteClick: () => void
}

const EditButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const GridActionsColumn: React.FC<Props> = ({
    params,
    isInEditMode,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
}) => {
    if (isInEditMode) {
        const isNew = params.row.isNew
        return (
            <EditButtonWrapper>
                <GridActionsCellItem
                    icon={
                        <Button variant="outlined" size="small">
                            {isNew ? 'Add' : 'Update'}
                        </Button>
                    }
                    label="Save"
                    sx={{
                        color: 'primary.main',
                    }}
                    onClick={handleSaveClick}
                />
                <GridActionsCellItem
                    icon={
                        <Button variant="outlined" size="small" color="error">
                            Discard Changes
                        </Button>
                    }
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick}
                    color="inherit"
                />
            </EditButtonWrapper>
        )
    }

    return (
        <>
            <GridActionsCellItem
                icon={
                    <Button variant="outlined" size="small">
                        Edit
                    </Button>
                }
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick}
                color="inherit"
            />
            <GridActionsCellItem
                icon={
                    <Button variant="outlined" size="small" color="error">
                        Remove
                    </Button>
                }
                label="Remove"
                onClick={handleDeleteClick}
                color="inherit"
            />
        </>
    )
}

export default GridActionsColumn
