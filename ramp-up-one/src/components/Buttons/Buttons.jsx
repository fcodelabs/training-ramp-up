import * as React from 'react';

const Buttons = () => {
  const editBtnStyle = {
    'background-color': '#ff5722',
    'height': '2rem',
    'border': '1px solid white',
    'border-radius': '6px',
    'font-weight': 'bold',
    'color': 'white',
  };
  const removeBtnStyle = {
    'height': '2rem',
    'border': '1px solid gray',
    'border-radius': '6px',
    'font-weight': 'bold',
    'color': 'black',
  };

  //    (<td className="k-command-cell">
  //                 <button className="k-button k-grid-save-command" style={{backgroundColor: 'orange'}} >
  //                     {isNewItem ? "Add" : "Update"}
  //                 </button>
  //                 <button className="k-button k-grid-cancel-command"  onClick={handleDiscardCancel}>
  //                     {isNewItem ? "Discard" : "Cancel"}
  //                 </button>
  //             </td>) :
  return (
    <td className="k-command-cell">
      <button
        className="k-primary k-button k-grid-edit-command" style={editBtnStyle}>
        Edit
      </button>
      <button className="k-button k-grid-remove-command" style={removeBtnStyle}>
        Remove
      </button>
    </td>
  );
};

export default Buttons;
