import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"

import api from "../../services/api"

import convertDurationToString from "../../utils/convertDurationToString"

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration: string,
  durationAsString: string,
  description: string,
  url: string,
}

type EpisodeTypes = {
  episode: Episode
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export default function Episode({ episode }: EpisodeTypes) {

  const { query } = useRouter()

  return (
    <div>
      {episode.title}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (cxt) => {

  const { slug } = cxt.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: pt,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 Hours
  }
}
