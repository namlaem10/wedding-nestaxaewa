import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const withTranslations = (namespaces = ["common"]) => {
  return async (context?: any) => {
    const locale = context?.locale || "vi";
    return {
      ...(await serverSideTranslations(locale, namespaces)),
      initialLocale: locale,
    };
  };
};
