import { MyContextProvider } from "@/context/MyContext";
import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/GlobalStyle";
import Script from "next/script";
import Layout from "@/components/layout.js/Layout";
import Head from "next/head";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <GlobalStyles />
      <Head>
        <meta name="author" content="y@sh" />
      
        {/* For browser color */}
        <meta name="theme-color" content="#870808" />
        <meta name="msapplication-navbutton-color" content="#870808" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#870808" />
        {/* favicon */}
        <link
          rel="icon"
          type="image/png"
          href="https://bestmakeupartistindelhi.com/fav-icon/favicon14.png"
        />

        {/* Open graph meta tag */}
        <meta property="og:site_name" content="bestmakeupartistindelhi" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* twiiter card */}
      </Head>
      <Layout>
        <a
          href="https://api.whatsapp.com/send?phone=918882198989&text=Hi"
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            right: '25px',
            bottom: '70px',
            zIndex: '99999999',
          }}
        >
          <Image alt='bestmakeupartistindelhi whatsapp' src="https://i.ibb.co/VgSspjY/whatsapp-button.png" width={55} height={55}></Image>
        </a>
        <Component {...pageProps} />
      </Layout>
    </MyContextProvider>
  );
}
