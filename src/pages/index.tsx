import { BackgroundMusic } from "@/components/backgroundMusic";
import { withTranslations } from "@/components/withTranslations";
import { COVER_IMAGES, PHOTOS } from "@/constants";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { EventInfo } from "../components/EventInfo";
import { FamilyInfo } from "../components/FamilyInfo";
import { PhotoGallery } from "../components/gallery/PhotoGallery";
import { GuestMessages } from "../components/GuestMessages";
import { Introduction } from "../components/Introduction";
import { OurStory } from "../components/OurStory";
import Head from "next/head";

export default function Home() {
  const { t } = useTranslation("common", { useSuspense: false });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const groomFamily = [
    { role: t("father"), name: "Nguyễn Quang Lâm", note: "✝" },
    { role: t("mother"), name: "Lê Thị Bích Liên" },
  ];

  const brideFamily = [
    { role: t("father"), name: "Nguyễn Hữu Lộc" },
    { role: t("mother"), name: "Nguyễn Thị Bích Giang" },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Quang Đăng & Tuyết Nhi's Wedding</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>"
        />
      </Head>
      <main>
        <BackgroundMusic />
        <Introduction
          groomName="Tuyết Nhi"
          brideName="Quang Đăng"
          welcomeMessage={t("welcomeMessage", "Welcome to our wedding")} // Add a default value
          coverImage={COVER_IMAGES}
        />

        <FamilyInfo groomFamily={groomFamily} brideFamily={brideFamily} />

        <OurStory />

        <PhotoGallery photos={PHOTOS} />

        <EventInfo />

        <GuestMessages />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await withTranslations()(context)),
    },
  };
};
