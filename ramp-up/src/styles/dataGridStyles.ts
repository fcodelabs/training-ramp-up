export const dataGridStyles = {
  //data grid all styles
  textFieldStyles: {
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      border: "1px solid rgba(33, 150, 243, 1)",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 0,
    },
  },
  birthdayFieldStyles: {
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",

    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      border: "1px solid rgba(33, 150, 243, 1)",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 0,
      border: "none",
    },
    "& .MuiFormControl-root": {
      border: "none",
    },
  },
  genderFieldStyles: {
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",

    "& .MuiSelect-select": {
      border: "1px solid rgba(33, 150, 243, 1)",
      borderRadius: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  mobileFieldStyles: {
    "& .MuiFilledInput-root": {
      borderRadius: 0,
    },
    "& .MuiFormHelperText-root": {
      fontSize: 10,
      marginLeft: "0px",
    },
  },
  ageFieldStyles: {
    "& .MuiFormHelperText-root": {
      fontSize: 9,
      marginLeft: "0px",
      width: "100%",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 0,
    },
  },
  gridStyles: {
    "& .MuiDataGrid-row--editing": {
      boxShadow: "none",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "rgba(33, 150, 243, 0.08)",
    },
    "& .MuiDataGrid-columnHeader:focus-within": {
      outline: "none !important",
    },
    "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer": {
      width: "auto",
      visibility: "visible",
    },
    "& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
      {
        opacity: 0.5,
      },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      justifyContent: "space-between",
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },
  },
};
