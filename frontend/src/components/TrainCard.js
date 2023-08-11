import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import React from 'react'
import moment from 'moment';

const TrainCard = (trainData) => {
    const train = trainData.data;
    const departureTime = train.departureTime.time;
    const isoDate = new Date(departureTime);

const hours = isoDate.getUTCHours();
const minutes = isoDate.getUTCMinutes();
    //const TrainTime = moment.utc(departureTime).format('MM/DD/YY');

  return (
    <Card style={{background: "#E1E1E1", position: 'relative', width: 400, margin: 30}}>
        <CardContent>
            <div style={{display: 'flex', justifyContent: "space-between", paddingBottom: 20}}>
              <Box component="div" sx={{ display: 'inline', background: "white",  padding:1, borderRadius: "10%"}}>{train.trainNumber}</Box>
              <Typography variant='h6'>{hours+":"+minutes}</Typography>
              <Typography variant='h5'>{train.trainName}</Typography>
            </div>
            <Box component="div" sx={{display: 'flex', justifyContent: "space-between",alignItems: 'flex-end', paddingBottom: 0}}>
              <div style={{display:'flex', justifyContent:'flex-start', flexDirection:'column'}}>
                <Typography variant='h6' fontWeight='bold'>Seat Availability</Typography>
                <Typography variant='body1' >AC - {train.seatsAvailable.AC}</Typography>
                <Typography variant='body1' >Sleeper - {train.seatsAvailable.sleeper}</Typography>
              </div>
              <div>
                <Button variant='contained' color='success'>
                  RS. {train.price.sleeper}
                </Button>
              </div>
            </Box>
        </CardContent>
    </Card>
  )
}

export default TrainCard