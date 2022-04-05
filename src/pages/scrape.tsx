import getBaseUrl from '@/utils/baseUrl';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const baseUrl = getBaseUrl(req);
  let resData = null;
  await fetch(`${baseUrl}/api/scrape`)
    .then((response) => response.json())
    .then((data) => (resData = data));
  // const user = await getUserData('EUpJeKmW6FcMyS1JrAJI');
  return {
    props: { data: resData }, // will be passed to the page component as props
  };
}

import React from 'react';

type Props = {
  data: any;
};

const scrape = (props: Props) => {
  return <div>{JSON.stringify(props.data)}</div>;
};

export default scrape;
