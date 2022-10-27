import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  pageTitle: string;
  useGlassmorphicBox?: boolean;
  withPrivacyPolicy?: boolean;
  children: React.ReactNode;
};

const Splash = ({
  pageTitle,
  useGlassmorphicBox = false,
  withPrivacyPolicy = false,
  children,
}: Props) => {
  const title = `socialize | ${pageTitle}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="splash-container">
          <div>
            <div className={useGlassmorphicBox ? 'splash-center' : ''}>
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
};

export default Splash;
