import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi there! I'm a rising junior studying Computer Science at the University of Washington</p>
        <p>
          (Check out my {' '}
          <a href="https://www.linkedin.com/in/gabriel-guo/">Linkedin</a>.)
        </p>
      </section>
    </Layout>
  );
}