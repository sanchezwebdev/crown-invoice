import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using Next.js" />
        <link rel="icon" href="/favicon.ico" />                
        <title>Crown Invoice</title>
      </Head>      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
