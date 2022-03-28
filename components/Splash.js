import Head from 'next/head';
import Link from 'next/link';
import styles from './Splash.module.scss';

const Splash = ({
  pageTitle,
  useGlassmorphicBox,
  withPrivacyPolicy,
  children,
}) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
    </Head>
    <main>
      <div className={styles.container}>
        <div className={styles.sheen}>
          <div className={useGlassmorphicBox ? styles.center : ''}>
            {children}
          </div>
          {withPrivacyPolicy && (
            <div className="text-center mt-3">
              <Link href="/privacy-policy" passHref>
                <a className="small text-dark">Privacy Policy</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  </>
);

export default Splash;
