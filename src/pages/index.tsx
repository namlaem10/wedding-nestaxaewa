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

export default function Home() {
  const { t } = useTranslation("common", { useSuspense: false });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const groomFamily = [
    { role: t("father"), name: "Ba Nguyễn Quang Lâm", note: "U" },
    { role: t("mother"), name: "Mẹ Lê Thị Bích Liên" },
  ];

  const brideFamily = [
    { role: t("father"), name: "Ba Nguyễn Hữu Lộc" },
    { role: t("mother"), name: "Mẹ Nguyễn Thị Bích Giang" },
  ];

  if (!isClient) {
    return null;
  }

  return (
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

      <PhotoGallery photos={PHOTOS.slice(0, 6)} />

      <EventInfo />

      <GuestMessages />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await withTranslations()(context)),
    },
  };
};
