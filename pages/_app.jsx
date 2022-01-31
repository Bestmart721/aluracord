import GlobaStateProvider from "../src/hooks/global-state";

import "./globalStyle.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobaStateProvider>
      <Component {...pageProps} />
    </GlobaStateProvider>
  );
}

export default MyApp;
