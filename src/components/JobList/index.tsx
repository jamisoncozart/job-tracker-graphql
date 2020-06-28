import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Container, 
  Box,
  makeStyles
} from '@material-ui/core';

import { Job } from '../../lib/core/definitions';
import getJobs from '../../services/api/getJobs';

const useStyles = makeStyles({
  card: {
    padding: 20,
    margin: 10
  }
})

const JobList = () => {
  const classes = useStyles();
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
      <Container maxWidth="md">
        {jobs.map(job => {
          return (
            <Card className={classes.card} key={job.id}>
              <h2>{job.title}</h2>
              <h5>{job.company.name}</h5>
              <hr />
              {job.cities.length > 0 && 
                <h4>
                  Location: {job.cities[0].name}, {job.cities[0].country.name}
                </h4>
              }
              <p>Posted On: {job.postedAt} | Updated On: {job.updatedAt}</p>
              <Button href={job.applyUrl}>Apply</Button>
            </Card>
          )
        })}
      </Container>
    )
  } else {
    return <h2>Loading...</h2>
  }
}

export default JobList;