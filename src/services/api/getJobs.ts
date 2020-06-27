import { JobsData } from '../../lib/core/definitions'

export default async (): Promise<JobsData | undefined> => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          jobs {
            id
            title
            cities {
              id
              name
              country {
                id
                name
              }
            }
            description
            applyUrl
            company {
              id
              name
              websiteUrl
              logoUrl
            }
            tags {
              id
              name
            }
            userEmail
            postedAt
            updatedAt
          }
        }`})
    });
    const data = await response.json();
    return data;
  } catch(error) {
    console.log(error);
  }
}