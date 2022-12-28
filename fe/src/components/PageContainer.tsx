import React from 'react';
import { Container } from '@mui/material';

interface PageContainerProps {
  children: JSX.Element | JSX.Element[];
}
const PageContainer: React.FC<PageContainerProps> = ({
  children,
}): JSX.Element => <Container maxWidth="md">{children}</Container>;

export default PageContainer;
