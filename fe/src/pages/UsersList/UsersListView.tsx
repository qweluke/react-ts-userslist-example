import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import PageContainer from '../../components/PageContainer';
import UsersListTable from './UsersListTable';
import {
  selectAllUsers,
  selectUsersLoadingStatus,
  selectTotalUsersCount,
  fetchUsersPaginatedIfNeeded,
} from '../../store/users.slice';
import requestStatus from '../../store/requestStatus';
import { useAppDispatch, useAppSelector } from '../../hooks';
import StyledError from '../../components/ErrorMessage';

const UsersListView = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const usersLoadingStatus = useAppSelector(selectUsersLoadingStatus);
  const usersList = useAppSelector(selectAllUsers);
  const totalUsersCount = useAppSelector(selectTotalUsersCount);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );

  // todo: clear location.state when
  const [currentPage, setCurrentPage] = useState<number>(
    location.state?.currentPage || 0,
  );

  useEffect(() => {
    // todo: cancel previous request when fast page switch performed
    dispatch(
      fetchUsersPaginatedIfNeeded({
        page: currentPage + 1,
      }),
    )
      .then(unwrapResult)
      .catch((rejectedValueOrSerializedError) =>
        setRequestErrorMessage(rejectedValueOrSerializedError.message),
      );
  }, [dispatch, currentPage]);

  return (
    <PageContainer>
      <>
        {requestErrorMessage && (
          <StyledError>
            Unable to fetch API data. Reason: {requestErrorMessage}
          </StyledError>
        )}
      </>
      <UsersListTable
        handlePageChange={(nextPage) => setCurrentPage(nextPage)}
        currentPage={currentPage}
        isLoading={usersLoadingStatus === requestStatus.pending}
        rowCount={totalUsersCount}
        rows={usersList}
      />
    </PageContainer>
  );
};

export default UsersListView;
