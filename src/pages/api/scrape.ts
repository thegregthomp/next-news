import { NextApiRequest, NextApiResponse } from 'next';
import { firestore, fromMillis, postToJSON, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Buffer } from 'buffer';
import firebase from 'firebase/compat/app';
import { setDoc } from 'firebase/firestore';
import { sourceConverter } from '@/lib/converters';

var fs = require('fs');

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const userSnapshot = await firestore.collection('users').get();
  const usersWithSubscriptions = userSnapshot.docs
    .map((doc) => doc.data())
    .filter((user) => user.subscriptions.length > 0);

  const sourcesSnapshot = await firestore
    .collection('sources')
    .withConverter(sourceConverter)
    .get();
  const sources = sourcesSnapshot.docs.map((doc) => doc.data());

  sources.forEach(async (source) => {
    await fetchScreenshot(source);
  });

  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
    users: usersWithSubscriptions,
  });
}

const fetchScreenshot = async (source) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.SCREENDOT_TOKEN}`,
    },
  };

  await fetch(
    `https://screendot.io/api/standard?url=${source.url}&delay=1000&browserWidth=1200&browserHeight=1200`,
    options
  )
    .then((response) => response)
    .then(async (response) => {
      let bufs = [];
      response.body
        .on('data', (chunk) => {
          bufs.push(chunk);
        })
        .on('finish', () => {
          let buf = Buffer.concat(bufs);
          const filename = `${source.name
            .toLowerCase()
            .replace(/\s/g, '')}_${mm}_${dd}_${yyyy}`;
          const storageRef = ref(storage, filename);
          uploadBytes(storageRef, buf, {
            contentType: 'image/jpeg',
          })
            .then(async (snapshot) => {
              const url = await getDownloadURL(storageRef);
              console.log(url);
              const captureDoc = firestore.doc(`captures/${filename}`);
              await setDoc(captureDoc, {
                filename: filename,
                source: source.name,
                sourceId: source.id,
                url: url,
                day: dd,
                month: mm,
                year: yyyy,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            })
            .catch((e) => console.log(e));
        });
    })
    .catch((err) => console.error(err));
};
