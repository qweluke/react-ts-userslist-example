import React from 'react';
import { useNavigate, useLocation, generatePath } from 'react-router-dom';
import { GridEventListener } from '@mui/x-data-grid-pro';
import { Box } from '@mui/material';
import { UserInterface } from '../../interfaces/User.interface';
import routes from '../../routes';
import TableDataGrid from '../../components/TableDataGrid/TableDataGrid';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
    flex: 1,
  },
  {
    field: 'username',
    headerName: 'Username',
    sortable: false,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    sortable: false,
    flex: 1,
  },
];

interface UserListTableProps {
  rowCount: number;
  rows: UserInterface[];
  isLoading: boolean;
  handlePageChange: (nextPage: number) => void;
  currentPage: number;
}

const UsersListTable: React.FC<UserListTableProps> = ({
  rowCount = 0,
  rows = [],
  isLoading = false,
  handlePageChange,
  currentPage,
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const userData = params.row as UserInterface;
    return navigate(
      generatePath(routes.userDetails, { username: userData.username }),
      {
        // todo: keep state in the localstorage?
        state: {
          currentPage,
        },
      },
    );
  };

  return (
    <Box height="95vh" width="100%">
      <TableDataGrid
        name="users-list"
        isLoading={isLoading}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        page={currentPage}
        onPageChange={(nextPage) => handlePageChange(nextPage)}
        getRowClassName={({ row }) =>
          row.username === location.state?.lastVisitedUser ? 'highlighted' : ''
        }
        rows={rows}
        columns={columns}
        getRowId={(row: UserInterface) => row.email}
        onRowClick={handleRowClick}
      />
    </Box>
  );
};

export default UsersListTable;
