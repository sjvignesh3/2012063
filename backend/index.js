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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE3MzkyOTAsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOWM5NzFmMzQtZGRhNC00ODBmLTg1YjktNmUyNTliZTliOWRmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMTIwNjMifQ.07HxmUXkWpo9O9-mHNSRuC7XvAe7Fk4hoK8M9ydW-Rw`,
        }
    });
  
    const allTrainData = response.data;
    
    const filteredTrains = filterTrain30minRange(allTrainData);

    //console.log(allTrainData);
    res.json(filteredTrains);
      

    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

app.listen(3001,()=> console.log("Server Running"));