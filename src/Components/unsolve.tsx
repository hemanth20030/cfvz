import React from 'react'
import { useState,useEffect } from 'react';
function unsolve(username:any) {
    const [users, Setusers] = useState([]);
    const [programinglanguages, setprogramminglanguages] = useState([]);
    const [verdict, setverdict] = useState([]);
    const [tags, settags] = useState([]);
    const [levels, setlevels] = useState([]);
    const [ratings, setratings] = useState([]);
    const [unsolved,setunsolved]=useState([]);
  
    useEffect(() => {
      const api = async () => {
        const data = await fetch(
          "https://codeforces.com/api/user.status?handle=" + username.username,
          { method: "GET" }
        );
  
        const res = await data.json();
        Setusers(res.result);
        let resultLength = res.result.length;
  
        let problem_no=[''];
        
        for (let i = 0; i < resultLength; i++) {
         if(res.result[i].verdict=='WRONG_ANSWER')
         {
            console.log(res.result[i].verdict);
            problem_no = [...problem_no, res.result[i].contestId];
         }
         
          
        }
       console.log('this is');
       console.log(problem_no);
  
          
        function fetchData(data: any): any {
          const dataMap = data.reduce(
            (acc: any, e: any) => acc.set(e, (acc.get(e) || 0) + 1),
            new Map()
          );
          let tmp = [{}];
          tmp.shift();
          // console.log(dataMap);
          dataMap.forEach(function (value: any, key: any) {
            if (key !== "") {
              let p = {
                name: key,
                value: value,
              };
              if (tmp.length != 0) tmp = [...tmp, p];
              else tmp = [p];
            }
          });
          return tmp;
        }
        setprogramminglanguages(fetchData(programmingLanguages));
        setverdict(fetchData(verdictArray));
        settags(fetchData(tagsArray));
        setlevels(fetchData(levelsArray));
        setratings(fetchData(ratingsArray));
       
      };
  
      api();
    }, [username.username]);
  
  return (
    <div>
      <div className='container my-5'>
       <center>
        <h3>UnSolved</h3>
        <div>
            
        </div>
       </center>
      </div>
    </div>
  )
}

export default unsolve
