import { NextApiRequest, NextApiResponse } from 'next';
import { firestore, fromMillis, storage, auth } from '@/lib/firebase';
import firebase from 'firebase/compat/app';
import { setDoc } from 'firebase/firestore';
import { sourceConverter, userConverter } from '@/lib/converters';

import sgMail from '@sendgrid/mail';

var fs = require('fs');

function nth(n: number) {
  return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const userSnapshot = await firestore
    .collection('users')
    .withConverter(userConverter)
    .get();
  const usersWithSubscriptions = userSnapshot.docs
    .map((doc) => doc.data())
    .filter((user) => user.subscriptions.length > 0);

  const sourcesSnapshot = await firestore
    .collection('sources')
    .withConverter(sourceConverter)
    .get();
  const sources = sourcesSnapshot.docs.map((doc) => doc.data());

  const capturesSnapshot = await firestore
    .collection('captures')
    .where('day', '==', dd)
    .where('month', '==', mm)
    .where('year', '==', yyyy)
    .get();

  const captures = capturesSnapshot.docs.map((doc) => doc.data());

  usersWithSubscriptions.forEach(async (user) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const captureData = user.subscriptions.map((subscription) => {
      const capture = captures.find(
        ({ sourceId }) => sourceId === subscription
      );
      const source = sources.find(({ id }) => id === subscription);

      return {
        source: source?.name,
        capture_url: capture?.url,
        url: source?.url,
      };
    });

    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const month = today.toLocaleString('default', { month: 'long' });
    const dateString = `${dayOfWeek}, ${month} ${today.getDate()}${nth(
      parseInt(dd)
    )} ${yyyy}`;
    const sgData = {
      captures: captureData,
      firstName: user.firstName,
      lastName: user.lastName,
      date: dateString,
    };

    const msg = {
      to: user.email, // Change to your recipient
      from: 'greg@thegregthompson.com', // Change to your verified sender
      subject: 'Your Front Page News',
      templateId: 'd-77e1d9d2407145f080a73c42a24b11ff',
      dynamicTemplateData: sgData,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error.response.body);
      });
  });

  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
