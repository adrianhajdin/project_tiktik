import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'kr4jrn0q',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
