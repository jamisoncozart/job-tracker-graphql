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

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    margin: 10
  },
  primaryButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  secondaryButton: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}))

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
              <h3>{job.company.name}</h3>
              <hr />
              {job.cities.length > 0 && 
                <h4>
                  {job.cities[0].name}, {job.cities[0].country.name}
                </h4>
              }
              <p>Posted: {job.postedAt.toString().split('T')[0]} | Updated: {job.updatedAt.toString().split('T')[0]}</p>
              <Button 
                variant='contained' 
                className={classes.primaryButton}
                href={job.applyUrl}
              >
                  Apply
              </Button>
              <Button 
                variant='contained' 
                className={classes.secondaryButton}
                href='#'
              >
                  Details
              </Button>
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