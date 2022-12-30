import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Sector, Cell } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Axios from "axios";
import Paticles from "./Components/Paticles";
import Typewriter from 'typewriter-effect';
import Navbar from "./Components/navbar";
import Tables from "./Components/tables";
import Graphss from "./Components/graphs";
import History from "./Components/History";
import Discussion from "./Components/saysomething";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';


function App() {

  const [username,setusername]=useState("");
  const formRef = useRef<any>();

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    setusername(formRef.current["username"].value)

  }

 
  return (
    <>
    <h1></h1>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<>
      <div className="container my-5" style={{textAlign:'center',color:'red'}}>
        
      <Typewriter
  options={{
    
    strings: ['Welcome to CodeForcesVisualizer!!!'],
    autoStart: true,
    loop: true,
  }}
/>
      <Paticles/>
      </div>
       
     
      </>}/>
      <Route path="/home" element={<>
              <div className="main">
                <div className="my-3" style={{ textAlign: "center" }}>
                  <div className="">
                    <form ref={formRef as any} id="formcodeforces" onSubmit={HandleSubmit}>
                      <input
                        type="text"
                        name="username"
                        id=""
                        placeholder="Codeforces User Handle"
                        
                        style={{
                          height: "200px",
                          width: "70%",
                          textAlign: "center",
                        }}

                      />

                        <input type="submit" style={{marginLeft:'1%',color:'black'}} /> 
                      
                    </form>


                  </div>
                </div>
                { username !== "" && <Graphss username={username} /> }
                
              

                
              </div></>}/>
            <Route path="/contestdetails" element={<><History username={username}/></>}/>
            <Route path="/discussion" element={
           <Discussion/>
            }/>
    </Routes>

    </BrowserRouter>
    
      
            </>
         
  
  );
}

export default App;
