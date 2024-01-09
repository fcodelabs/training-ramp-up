import { GridRowsProp } from "@mui/x-data-grid";

const generateNewId = (data:GridRowsProp ) => {
    const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
    return maxId + 1;
  };

  
  export default generateNewId;