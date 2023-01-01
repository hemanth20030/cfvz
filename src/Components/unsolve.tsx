import React from 'react'
import { useState,useEffect } from 'react';

function unsolve(username:any) {
    const [users, Setusers] = useState([]);
    const [unsolvedd,setunsolvedd]=useState<any>([""]);

    const [programinglanguages, setprogramminglanguages] = useState([]);
    const [verdict, setverdict] = useState([]);
    const [tags, settags] = useState([]);
    const [levels, setlevels] = useState([]);
    const [ratings, setratings] = useState([]);
    
  
    useEffect(() => {
      const api = async () => {
        const data = await fetch(
          "https://codeforces.com/api/user.status?handle=" + username.username,
          { method: "GET" }
        );
  
        const res = await data.json();
        Setusers(res.result);
        let resultLength = res.result.length;
  
        let unsolved_Array=[];
        let solved_Array=new Set('1');
        for (let i = 0; i < resultLength; i++) {
          let problem_no=res.result[i].problem.contestId;
            let problem_index=res.result[i].problem.index;

            let combine=problem_no+"-"+problem_index+"   ";
         if(res.result[i].verdict!="OK")
         {
            
            
            unsolved_Array.push(combine);
            console.log(combine);
            
         }
         else
         {
          solved_Array.add(combine);
         }
        }
        let final_Array=new Set();
        for(let i=0;i<unsolved_Array.length;i++)
        {
          if(solved_Array.has(unsolved_Array[i])==false)
          {
            final_Array.add(unsolved_Array[i]);
          }
        }
        console.log(final_Array);
        setunsolvedd(final_Array);
       
      };
  
      api();
    }, [username.username]);
  
  return (
    <div>
      <div className='container my-5'>
       <center>
        <h3>UnSolved</h3>
        <div style={{border:'2px solid black'}}>
          <div className='container my-5'> 
            {unsolvedd}
            </div>
         
        </div>
       </center>
      </div>
    </div>
  )
}

export default unsolve
