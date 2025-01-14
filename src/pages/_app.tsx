import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "../../i18n";

export default appWithTranslation(
  function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
  },
  {
    i18n: {
      defaultLocale: "vi",
      locales: ["en", "vi"],
    },
  }
);
