import React from 'react';
import Document, { Html, Head, Main, NextScript, Script } from 'next/document';


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" >
        <Head >
        <script
      type="text/javascript"
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
    ></script>
          {/* <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"/> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
