import React from 'react';
import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';
import { styled } from '@mui/material/styles';

const StyledDataGridPro = styled(DataGridPro)({
  '.MuiDataGrid-row': {
    '&.highlighted': {
      backgroundColor: '#b9d5ff91',
    },
  },
}) as typeof DataGridPro;

interface TableDataGridProps extends DataGridProProps {
  isLoading: boolean;
  name: string;
}

const TableDataGrid = ({
  name,
  isLoading,
  ...rest
}: TableDataGridProps): React.ReactElement => (
  <StyledDataGridPro
    rowsPerPageOptions={[20]}
    pageSize={20}
    loading={isLoading}
    {...rest}
  />
);

TableDataGrid.defaultProps = {
  isLoading: true,
};

export default TableDataGrid;
