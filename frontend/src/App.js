import {React, useEffect, useState} from 'react'

function App() {

  const [data,setData] = useState([]);
   
  useEffect(()=>{
    const res= fetch('http://localhost:3001/trains').then(res=> res.json()).then(data => console.log(data)).then(()=> console.log(data));
    {console.log(data)}
  },[])
 
  return (
    <div>
      Frontend
    </div>
  );
}

export default App;
