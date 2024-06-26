import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <footer>
            <p>Footer</p>
          </footer>
          <NextScript />
        </body>
      </Html>
    );
  }
}
