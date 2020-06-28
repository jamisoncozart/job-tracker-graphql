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
  gridItem: {
    padding: 10
  },
  card: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  jobTitle: {
    fontSize: 22,
    marginBottom: 5
  },
  companyWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  companyLogo: {
    height: 25,
    borderRadius: 5,
    marginRight: 8
  },
  companyLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  hr: {
    marginTop: 10,
    marginBottom: 5
  },
  timeDetails: {
    fontSize: 14,
  },
  primaryButton: {
    background: theme.palette.primary.dark,
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
        <Grid container>
          {jobs.map(job => {
            return (
              <Grid className={classes.gridItem} item xs={12} sm={6} md={4}>
                <Card className={classes.card} id='jobCard' key={job.id}>
                  <Box>
                    <h2 className={classes.jobTitle}>{job.title}</h2>
                    <Box className={classes.companyWrapper}>
                      {job.company.logoUrl && 
                        <img className={classes.companyLogo} src={job.company.logoUrl} />
                      }
                      <h4><a className={classes.companyLink} href={job.company.websiteUrl}>{job.company.name}</a> - {job.cities.length > 0 ? job.cities[0].name : 'Remote Work'}</h4>
                    </Box>
                    <hr className={classes.hr} />
                    <p className={classes.timeDetails}>
                      <strong>Posted:</strong> {job.postedAt.toString().split('T')[0]}
                    </p>
                    <p className={classes.timeDetails}>
                      <strong>Updated:</strong> {job.updatedAt.toString().split('T')[0]}
                    </p>
                  </Box>
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