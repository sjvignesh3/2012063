import {React, useEffect, useState} from 'react'
import Header from "./components/Header";
import Container from './components/Container';

function App() {

  const [data,setData] = useState([]);
   
  useEffect(()=>{
    const res= fetch('http://localhost:3001/trains').then(res=> res.json()).then(data => setData(data)).then(()=> console.log(data));
  },[])
 
  return (
    <div>
      <Header/>
      <Container trainData={data}/>
    </div>
  );
}

export default App;
