import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'r0q1hk5u',
  dataset: 'production',
  apiVersion: '2022-11-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
