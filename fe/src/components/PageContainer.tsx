import React from 'react';
import { Container } from '@mui/material';

interface PageContainerProps {
  children: JSX.Element | JSX.Element[];
}
const PageContainer = ({ children }: PageContainerProps) => (
  <Container maxWidth="md">{children}</Container>
);

export default PageContainer;
