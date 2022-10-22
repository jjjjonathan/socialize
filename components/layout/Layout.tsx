import React from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import NavMenu from '../nav/NavMenu';
import styles from './Layout.module.css';
import { SessionUser } from '../../types/misc';

type Props = {
  pageTitle: string;
  children: React.ReactNode;
  currentUser: SessionUser;
};

const Layout = ({ pageTitle, children, currentUser }: Props) => {
  const title = `socialize | ${pageTitle}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <NavMenu currentUser={currentUser} />
      </header>
      <main className={styles.mainContainer}>
        <Container>{children}</Container>
      </main>
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;