import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { PodcastModel } from "../models/podcast-model";
const { createPodcast, updatePodcast, deletePodcast } = require("../repositories/podcasts-repository");

export const serviceCreatePodcast = async (podcast: PodcastModel): Promise<PodcastTransferModel> => {
  try {
    const id = await createPodcast(podcast);
    return { statusCode: 201, body: [{ ...podcast, id }] };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: [] };
  }
};

export const serviceUpdatePodcast = async (id: number, podcast: PodcastModel): Promise<PodcastTransferModel> => {
  try {
    await updatePodcast(id, podcast);
    return { statusCode: 200, body: [podcast] };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: [] };
  }
};

export const serviceDeletePodcast = async (id: number): Promise<PodcastTransferModel> => {
  try {
    await deletePodcast(id);
    return { statusCode: 204, body: [] };
  } catch (err: any) {
    console.error(err);
    if (err.message === 'Podcast não encontrado') {
      return { statusCode: 404, body: [] };
    }
    return { statusCode: 500, body: [] };
  }
}; 