import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Ian Mark, a creative FrontEnd Developer</p>
        <p>Here are my blogs on various topics</p>
      </section>
    </Layout>
  );
}
