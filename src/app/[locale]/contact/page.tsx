import Contact from "../features/Contact/components/Contact";
import Header from "../components/header/Header";
import Head from "next/head";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <Head>
        <title>{t("metadata.contactTitle")}</title>
        <meta name="description" content={t("metadata.contactDescription")} />
      </Head>
      <Header />
      <Contact />
    </>
  );
}
