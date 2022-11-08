import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import NavMenu from '../nav/NavMenu';
import { SessionUser } from '../../types/misc';

const Main = styled.main`
  margin-top: 7em;
`;

type Props = {
  pageTitle: string;
  children: React.ReactNode;
  currentUser: SessionUser;
  profilePicture: string;
};

const Layout = ({
  pageTitle,
  children,
  currentUser,
  profilePicture,
}: Props) => {
  const title = `socialize | ${pageTitle}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <NavMenu currentUser={currentUser} profilePicture={profilePicture} />
      </header>
      <Main>
        <Container>{children}</Container>
      </Main>
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
