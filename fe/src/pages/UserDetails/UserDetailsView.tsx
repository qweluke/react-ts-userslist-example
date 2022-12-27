import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import PageContainer from '../../components/PageContainer';
import routes from '../../routes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchUsersByUsername,
  selectUsersLoadingStatus,
  selectUserByUsername,
} from '../../store/users.slice';
import requestStatus from '../../store/requestStatus';
import StyledError from '../../components/ErrorMessage';
import UserInfo from '../../components/UserInfo';

const UserDetailsView = () => {
  const location = useLocation();
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
  const usersLoadingStatus = useAppSelector(selectUsersLoadingStatus);
  const userData = useAppSelector(selectUserByUsername(username!));

  useEffect(() => {
    // make sure we always have fresh data
    dispatch(
      fetchUsersByUsername({
        username: username!,
      }),
    )
      .then(unwrapResult)
      .then((userData) => {
        if (!userData) {
          setRequestErrorMessage(`User '${username}' not found`);
        }
      })
      .catch((rejectedValueOrSerializedError) =>
        setRequestErrorMessage(rejectedValueOrSerializedError.message),
      );
  }, [dispatch, username]);

  return (
    <PageContainer>
      <>
        {requestErrorMessage && (
          <StyledError>
            Unable to fetch API data. Reason: {requestErrorMessage}
          </StyledError>
        )}
      </>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserInfo
            user={userData}
            isLoading={usersLoadingStatus !== requestStatus.fulfilled}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            component={Link}
            to={routes.index}
            state={{
              ...location?.state,
              lastVisitedUser: username,
            }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserDetailsView;
