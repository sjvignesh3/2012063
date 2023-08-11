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

app.get('/trains',async (req, res) => {

    try {
      const response = await axios.get('http://20.244.56.144/train/trains',{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE3MzQyMjYsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOWM5NzFmMzQtZGRhNC00ODBmLTg1YjktNmUyNTliZTliOWRmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMTIwNjMifQ.VQRY8uvJ3--MLZf9BMGiP6LV6TWS8TojgfiyoZKGz_c`,
        }
    });
  
    const processedData = response.data;
  
    res.json(processedData);
      

    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

app.listen(3001,()=> console.log("Server Running"));