const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app= express({cors});
app.use(express.json());
app.use(cors());
let trainData = null; 

function setTrainData(data){
    trainData= data;
}

function sortTrains1(filteredTrains){

    // SOrt data based on criteria given
    const sortedTrains = filteredTrains.sort((a, b) => {
      if (a.price.sleeper !== b.price.sleeper) {
        return a.price.sleeper - b.price.sleeper; // Descending order of sleeper price
      } else if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
        return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper; // Descending order of sleeper seats
      } else {
        return a.departureTime.time - b.departureTime.time; // Ascending order of departure time
      }
    });
      
      return sortedTrains;
  }

function filterTrain30minRange(allTrainData){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

  
    // Filter out trains departing in the next 30 minutes
    const filteredTrains = allTrainData.filter(train => {
        const departureTime = new Date(year,month,date,train.departureTime.Hours,train.departureTime.Minutes,train.departureTime.Seconds);
        train.departureTime['time']= departureTime;
        const timeDifference = departureTime - now;
        
        return timeDifference > 30 * 60 * 1000; 
    });
  
  return filteredTrains;
}

app.get('/trains',async (req, res) => {

    try {
      const response = await axios.get('http://20.244.56.144/train/trains',{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE3Mzk1ODAsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOWM5NzFmMzQtZGRhNC00ODBmLTg1YjktNmUyNTliZTliOWRmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMTIwNjMifQ.npt12kNJIccDwr4EdasDyuNrbdC8X15qef2LYlpfZmk`,
        }
    });
  
    const allTrainData = response.data;
    
    const filteredTrains = filterTrain30minRange(allTrainData);
    const sortTrains = sortTrains1(filteredTrains);

    //console.log(allTrainData);
    res.json(sortTrains);
      

    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

app.listen(3001,()=> console.log("Server Running"));