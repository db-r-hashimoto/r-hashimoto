import React from "react";

export type Props = {
  /** language */
  language: string;
  /** タイトル */
  title: string;
  /** description */
  description: string;
};

const Header: React.FC<Props> = ({ language, title, description }) => {
  return (
    <>
      <html lang={language} />
      <title>{title} | db-r-hahsimoto's PORTFOLIO</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.GATSBY_ORIGIN_URL}/images/icon_horse.png`}
      />
      <meta
        name="google-site-verification"
        content="IqHGNgoovC1fR2Qm7S_h3_Kt7wudqpPlv6aUb2UtXWY"
      />
    </>
  );
};

export default Header;
