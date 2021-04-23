import { GetStaticProps } from "next";
import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../services/api";

import styles from "../styles/app.module.scss";
import convertDurationToString from "../utils/convertDurationToString";

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  description: string;
  duration: string;
  durationAsString: string;
  url: string;
  published_at: string;
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home({ episodes }: HomeProps) {
  return (
    <div className={styles.appWrapper}>
      <h1>Home SpilCast</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
      locale: pt,
    }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToString(Number(episode.file.duration)),
    description: episode.description,
    url: episode.file.url,
  }));

  return {
    props: { episodes },
    revalidate: 60 * 60 * 8,
  };
};
