import Home from "./features/Home/Home";
import Head from "next/head";
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations("metadata");
  return (
    <div className="">
      <Head>
        <title>{t("title")}</title>
      </Head>
      <Home />
    </div>
  );
}
