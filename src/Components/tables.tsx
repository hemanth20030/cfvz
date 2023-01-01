import React from 'react'
import { useState,useEffect } from 'react';
import Unsolve from './unsolve';
function tables(username:any) {
 
  const [users, Setusers] = useState([]);
  const [maxvalue,setmaxvale]=useState(0);
  const [minvalue,setminvalue]=useState(10000000000000);
  const [contests,setcontests]=useState(0);
  const [trieed,settrieed]=useState<any>(10);
  const [solved,setsolved]=useState(0);
  const[status,setstatus]=useState([]);
  const [wronganswer,setwronganswer]=useState<any>(0);
  const [maxacs,setmaxacs]=useState<any>(0);
  const [maxup,setmaxup]=useState<any>(0);
  const [maxdown,setmaxdown]=useState<any>(0);

  useEffect(() => {
    const api = async () => {
      const data = await fetch(
        "https://codeforces.com/api/user.rating?handle="+username.username,
        { method: "GET" }
      );

      const newdata=await fetch("https://codeforces.com/api/user.status?handle=" + username.username, { method: "GET" });


      const jsonData = await data.json();
      Setusers(jsonData.result);
      
      const newjsonData=await newdata.json();
      setstatus(newjsonData.result);

      let resultLength = jsonData.result.length;
      let newresultLength=newjsonData.result.length;
      

      let rankArray = [0];
      let max_up=0,max_down=0;
      for(let i=0;i<resultLength;i++)
      {
        rankArray=[...rankArray, jsonData.result[i].rank];

        if(jsonData.result[i].oldRating>=jsonData.result[i].newRating)
        {
            let down=jsonData.result[i].oldRating-jsonData.result[i].newRating;
            if(down>max_down)
            max_down=down;
        }
        else
        {
          let up=jsonData.result[i].newRating-jsonData.result[i].oldRating;
            if(up>max_up)
            max_up=up;
        }
      }
      console.log(max_down);
      setmaxup(max_up);
      setmaxdown(max_down);

      let triedcount=0;
      let wronganswer=0;
      let max_acs=0;
      let maps= new Map([]);
      let maps1= new Map<string, number>();
      for(let i=0;i<newresultLength;i++)
      {
        if(newjsonData.result[i].verdict=="OK" )
        {
          if(maps.has(newjsonData.result[i].contestId)==false)
          {
          maps.set(newjsonData.result[i].contestId,1);
          triedcount+=1;
         
          }

        } 

        if(maps1.has(newjsonData.result[i].contestId)==false)
        {
          maps1.set(newjsonData.result[i].contestId,1);
        }
        else
        {
          let val : number =0;
          if(maps1.get(newjsonData.result[i].contestId))
          {
            val=newjsonData.result[i].contestId;
            val+=1;
          }
          
          maps1.set(newjsonData.result[i].contestId,val);
        }
         
        if(newjsonData.result[i].verdict=="WRONG_ANSWER")
        wronganswer+=1;

        if(newjsonData.result[i].passedTestCount>max_acs)
        max_acs=newjsonData.result[i].passedTestCount;

        

        
      }
      
      setsolved(triedcount);
      setwronganswer(wronganswer);
      settrieed(newresultLength);
      setmaxacs(max_acs);
      
     
      
      
      
 let ranklength=rankArray.length;
 
 let maxvalue=0;
 let minvalue=1000000000;
 setcontests(ranklength-1);
      for(let i=0;i<ranklength;i++)
      {
          if(maxvalue< rankArray[i])
          maxvalue=rankArray[i];
          if(minvalue>rankArray[i] &&  rankArray[i]!=0)
          minvalue=rankArray[i];
      }
      
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
      <td>{trieed}</td>
      
      
     
    </tr>
    <tr>
      
      <td>Solved</td>
      <td>{solved}</td>
      
    </tr>
    <tr>
      
      <td>Wrong Answer</td>
      <td>{wronganswer}</td>
      
    </tr>
    <tr>
      <td>Max attempts</td>
      <td></td>
    </tr>
    <tr>
      <td>Max AC'S</td>
      <td>{maxacs}</td>
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

    <tr>
      <td>Max up's</td>
      <td>+{maxup}</td>
    </tr>

    <tr>
      <td>Max down's</td>
      <td>-{maxdown}</td>
    </tr>
    
  </tbody>
</table>
    </div>
    
  </div>
</div>

<Unsolve username={username.username}/>
    </>
  )
}

export default tables
