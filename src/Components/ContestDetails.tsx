import React from "react";
import { useState, useEffect } from "react";
export default function History(username:any) {
  const [users, Setusers] = useState([]);
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
      let maxvalue=0;
      let minvalue=10000000000000;
      for(let i=0;i<resultLength;i++)
      {
        rankArray=[...rankArray, jsonData.result[i].rank];
      }

 let ranklength=rankArray.length;
      for(let i=0;i<ranklength;i++)
      {
          if(maxvalue< rankArray[i])
          maxvalue=rankArray[i];
          if(minvalue>rankArray[i])
          minvalue=rankArray[i];
      }
    
    };

    api();
  }, [username.username]);
  
  return (
    <>
      <div
        className="container my-5"
        style={{ textAlign: "center", color: "green" }}
      >
        <h3>Entire Contest Details</h3>
      </div>

      <div className="container">
      <table className="table" style={{ border: "2px solid black" }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ContestName</th>
                    <th scope="col">OldRating</th>
                    <th scope="col">NewRating</th>
                    <th scope ="col">Change</th>
                    <th scope="col">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  
                
             
               
        
          {
            
         
      users?.map((currentElementofApi : any, index) => {
          
          return (
            
              <tr>
                <td>{index+1}</td>
              
                <td style={{color:'#3C2A21'}}>{currentElementofApi.contestName}</td>
                <td style={{color:'red'}}>{currentElementofApi.oldRating}</td>
                <td style={{color:'green'}}>{currentElementofApi.newRating}</td>
                
                <td style={{color:'black'}}>{currentElementofApi.newRating-currentElementofApi.oldRating}</td>
                <td style={{color:'blue'}}>{currentElementofApi.rank}</td>
              </tr>
                
          );
          
        })
       
      }

      </tbody>
      </table>
      </div>

    </>
  );
}
