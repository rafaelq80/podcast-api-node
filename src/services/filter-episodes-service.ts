import { PodcastTransferModel } from "../models/podcast-transfer-model";
const { repositoryPodcast } = require("../repositories/podcasts-repository");

export const serviceFilterEpisodes = async (
  podcastName: string | undefined
): Promise<PodcastTransferModel> => {
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  const queryString = podcastName?.split("?p=")[1] || "";
  const data = await repositoryPodcast(queryString);

  responseFormat = {
    statusCode: data.length !== 0 ? 200 : 204,
    body: data,
  };

  return responseFormat;
};
