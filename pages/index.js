import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.headingSm}>Hi, I'm Ian Mark</p>
        <p className={utilStyles.headingSm1}>
          🫠let's talk and read about data 🗣️...
        </p>
        {/* <p>Here are my blogs on various topics</p> */}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h2 className={utilStyles.headingLg}>All Topics</h2> */}
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, hero, desc }) => (
            <li className={utilStyles.listItem} key={id}>
              <img src={hero} alt="" />
              <Link href={`/blog/${id}`} className={utilStyles.postTitle}>
                {title}
              </Link>

              <div className={utilStyles.lightText}>{desc}</div>
              <small className={utilStyles.lightDate}>
                <Date dateString={date} className={utilStyles.dateTxt} />
                <span>
                  <Link href={`/blog/${id}`} className={utilStyles.postTitle2}>
                    continue read
                  </Link>{" "}
                  📖
                </span>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
