import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

async function myFetcher(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig
        value={{
          fetcher: myFetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
