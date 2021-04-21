import styles from "../styles/app.module.scss";

export default function Home({ episodes }) {
  return (
    <div className={styles.appWrapper}>
      <h1>Home SpilCast</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:8000/episodes");
  const data = await response.json();

  return {
    props: { episodes: data },
    revalidate: 60 * 60 * 24,
  };
}
