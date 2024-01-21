import * as React from "react";
import Button from "@mui/material/Button";
import {
  GridActionsCellItem,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import styled from "styled-components";
import { Box } from "@mui/material";

interface Props {
  params: GridRenderEditCellParams;
  isInEditMode: boolean;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

const EditButtonWrapper = styled.div`
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
`;

const GridActionsColumn: React.FC<Props> = ({
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
      <EditButtonWrapper>
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
      </EditButtonWrapper>
    );
  }

  return (
    <ButtonWrapper>
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
    </ButtonWrapper>
  );
};

export default GridActionsColumn;
