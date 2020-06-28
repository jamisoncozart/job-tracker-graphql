import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Container, 
  Box,
  makeStyles,
  Grid
} from '@material-ui/core';

import { Job } from '../../lib/core/definitions';
import getJobs from '../../services/api/getJobs';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
  },
  primaryButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: '48%'
  },
  secondaryButton: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    width: '48%'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10
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
        <Grid container spacing={3}>
          {jobs.map(job => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card} key={job.id}>
                  <h2>{job.title}</h2>
                  <h3>{job.company.name} - {job.cities.length > 0 ? job.cities[0].name : 'Remote Work'}</h3>
                  <hr />
                  <p>Posted: {job.postedAt.toString().split('T')[0]} | Updated: {job.updatedAt.toString().split('T')[0]}</p>
                  <Box className={classes.buttonWrapper}>
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
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    )
  } else {
    return <h2>Loading...</h2>
  }
}

export default JobList;