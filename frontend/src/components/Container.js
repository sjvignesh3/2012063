import { Box } from '@mui/material'
import React from 'react'
import TrainCard from './TrainCard'

const Container = ({trainData}) => {
    console.log(trainData);
  return (
    <div style={{display:'flex', flexFlow: 'wrap', padding: 30, alignItems: 'space-around', justifyContent: 'space-around'}}>
        {trainData.map((train)=>{
            return <TrainCard data={train}/>
        })}
    </div>
  )
}

export default Container