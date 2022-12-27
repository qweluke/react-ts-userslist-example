import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { UserInterface } from '../interfaces/User.interface';
import { formatAddress } from '../helpers/formatters';

interface Props {
  user?: UserInterface;
  isLoading: boolean;
}

const UserInfo = (props: Props) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>
      Username:
    </Typography>

    <Typography variant="body1" gutterBottom>
      {props.isLoading ? <Skeleton /> : props.user?.username}
    </Typography>

    <Typography variant="subtitle2" gutterBottom>
      Email:
    </Typography>

    <Typography variant="body1" gutterBottom>
      {props.isLoading ? <Skeleton /> : props.user?.email}
    </Typography>

    <Typography variant="subtitle2" gutterBottom>
      Phone:
    </Typography>

    <Typography variant="body1" gutterBottom>
      {props.isLoading ? <Skeleton /> : props.user?.phone}
    </Typography>

    <Typography variant="subtitle2" gutterBottom>
      Website:
    </Typography>

    <Typography variant="body1" gutterBottom>
      {props.isLoading ? <Skeleton /> : props.user?.website}
    </Typography>

    <Typography variant="subtitle2" gutterBottom>
      Address:
    </Typography>

    <Typography variant="body1" gutterBottom>
      {props.isLoading ? <Skeleton /> : formatAddress(props.user!.address)}
    </Typography>
  </Box>
);

export default UserInfo;
