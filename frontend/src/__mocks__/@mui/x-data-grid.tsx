import React from 'react'; 
export * from '@mui/x-data-grid';

export const DataGrid = jest.fn().mockImplementation((props) => {
    const { rows, columns, ...otherProps } = props;

    return (
        <div data-testid="mocked-data-grid"> {/* Fix JSX syntax */}
            {/* Render any necessary content or components for testing */}
        </div>
    );
});
