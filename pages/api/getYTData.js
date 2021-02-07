// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;
let accessToken;

const getYTData = async (pageToken = '') => {
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/subscriptions?mine=true&pageToken=${pageToken}&maxResults=50&part=snippet`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (data?.nextPageToken) {
    return data.items.concat(await getYTData(data.nextPageToken));
  }

  return data.items;
};

export default async (req, res) => {
  const session = await getSession({ req });
  const token = await getToken({ req, secret, encryption: true });

  accessToken = token.accessToken;

  const data = await getYTData();

  res.status(200).json(data);
};
