import React, { useState, useEffect } from 'react';

import { Job } from '../../lib/core/definitions';
import getJobs from '../../services/api/getJobs';

const JobList = () => {
  const [jobs, setJobs] = useState(undefined as Job[] | undefined);
  useEffect(() => {
    async function retrieveJobs() {
      const jobList = await getJobs();
      if(jobList) {
        console.log(jobList)
        setJobs(jobList.data.jobs);
      } else {
        console.log('error occurred');
      }
    }
    retrieveJobs();
  }, [])
  console.log(jobs);
  if(jobs && jobs.length > 0) {
    return (
      <div>
        {jobs.map(job => {
          return (
            <div key={job.id}>
              <h2>{job.title}</h2>
              <h5>{job.company.name}</h5>
              <hr />
              <p>Description: {job.description}</p>
              <h4>
                Apply
                <a href={job.applyUrl}>{job.applyUrl}</a>
              </h4>
              <p>Posted At: {job.postedAt}</p>
              <p>Updated At: {job.updatedAt}</p>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <h2>Loading...</h2>
  }
}

export default JobList;