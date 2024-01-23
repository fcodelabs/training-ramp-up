import * as React from "react";
import Button from "@mui/material/Button";
import {
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import styled from "styled-components";

interface Props {
  params: GridRenderEditCellParams;
  isInEditMode: boolean;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

const AddDiscardButtonWrapper = styled.div`
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 0px 0 -5px;
  align-items: flex-start;
`;

const EditRemoveButtonWrapper = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 0 0 0 -4px;
`;

export const GridActionsColumn: React.FC<Props> = ({
  params,
  isInEditMode,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  if (isInEditMode) {
    const isNew = params.row.isNew;
    return (
      <AddDiscardButtonWrapper>
        <div>
          <Button variant="outlined" size="small" onClick={handleSaveClick}>
            <div>{isNew ? "Add" : "Update"}</div>
          </Button>
        </div>

        <div>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleCancelClick}
          >
            Discard Changes
          </Button>
        </div>
      </AddDiscardButtonWrapper>
    );
  }

  return (
    <EditRemoveButtonWrapper>
      <div>
        <Button variant="outlined" size="small" onClick={handleEditClick}>
          Edit
        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={handleDeleteClick}
        >
          Remove
        </Button>
      </div>
    </EditRemoveButtonWrapper>
  );
};


