import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TypographyProps } from '@mui/material';

const StyledError: React.FC<TypographyProps> = styled(Typography)(
  ({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    color: theme.palette.error.main,
  }),
);

export default StyledError;
