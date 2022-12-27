import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledError = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  color: theme.palette.error.main,
}));

export default StyledError;
