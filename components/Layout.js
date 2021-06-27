import Head from 'next/head';

const Layout = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
      <meta name="description" content="A new social network" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <h1>socialize</h1>
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
