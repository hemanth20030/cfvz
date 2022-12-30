import React from 'react'
import { useState,useEffect } from 'react';
function tables(username:any, dataa:any) {
  console.log(dataa);
  const [users, Setusers] = useState([]);
  const [maxvalue,setmaxvale]=useState(0);
  const [minvalue,setminvalue]=useState(10000000000000);
  const [contests,setcontests]=useState(0);
  useEffect(() => {
    const api = async () => {
      const data = await fetch(
        "https://codeforces.com/api/user.rating?handle="+username.username,
        { method: "GET" }
      );

      const jsonData = await data.json();
      Setusers(jsonData.result);
      console.log(jsonData);
      let resultLength = jsonData.result.length;
      let rankArray = [0];
      for(let i=0;i<resultLength;i++)
      {
        rankArray=[...rankArray, jsonData.result[i].rank];
      }
console.log(rankArray.length);
 let ranklength=rankArray.length;
 let maxvalue=0;
 let minvalue=1000000000;
 setcontests(ranklength);
      for(let i=0;i<ranklength;i++)
      {
          if(maxvalue< rankArray[i])
          maxvalue=rankArray[i];
          if(minvalue>rankArray[i] &&  rankArray[i]!=0)
          minvalue=rankArray[i];
      }
       console.log(maxvalue);
       setmaxvale(maxvalue);
      setminvalue(minvalue);
    };

    api();
  }, [username.username]);
  return (
    <>
    <div className="container my-5" >
  <div className="row ">
    <div className="col-sm">
    <table className="table" style={{border:'2px solid black'}}>
  <thead>
    <tr style={{backgroundColor:'skyblue'}}>
      
      <th scope="col">Some numbers about</th>
      <th scope="col">{username.username}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Tried</td>
     
      
      <td></td>
     
    </tr>
    <tr>
      
      <td>Solved</td>
      <td></td>
      
    </tr>
    <tr>
      <td>Max AC'S</td>
    </tr>
   
  </tbody>
</table>
    </div>
    <div className="col-sm">
    <table className="table" style={{border:'2px solid black'}}>
  <thead>
    <tr  style={{backgroundColor:'skyblue'}}>
      
      <th scope="col">Contests of</th>

      <th scope="col">{username.username}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Number of Contests</td>
       <td>{contests}</td>
    </tr>
    <tr>
      
      <td>BestRank</td>
      <td>{minvalue}</td>
       
    </tr>
    <tr>
     
      <td>WorstRank</td>
      <td>{maxvalue}</td>
       
    </tr>
    
  </tbody>
</table>
    </div>
    
  </div>
</div>
    </>
  )
}

export default tables
