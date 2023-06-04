import React from "react";
import { PureComponent } from "react";
import Unsolved from "./unsolve";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Sector,
  Cell,
} from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Axios from "axios";
import { useEffect, useState } from "react";
import Tables from "./tables";


const COLORS1 = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS2 = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#91D8E4","#82AAE3","#FF6E31","#850000","#ADA2FF","#227C70","#E6E2C3","#82C3EC","#CCD6A6","#DAE2B6","#F8F988","#FB2576","#2B3A55","#22A39F"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function graphs(username: any) {
  // console.log(username);
  const [users, Setusers] = useState([]);
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

      let programmingLanguages = [""];
      let verdictArray = [""];
      let tagsArray = [""];
      let levelsArray = [""];
      let ratingsArray = [""];

      for (let i = 0; i < resultLength; i++) {
        programmingLanguages = [
          ...programmingLanguages,
          res.result[i].programmingLanguage,
        ];
        verdictArray = [...verdictArray, res.result[i].verdict];
        tagsArray = [...tagsArray, ...res.result[i].problem.tags];
        levelsArray = [...levelsArray, ...res.result[i].problem.index];
        ratingsArray = [...ratingsArray, res.result[i].problem.rating];
        
        
      }
     

        
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
    <>
    <div className="my-5" style={{ backgroundColor: "white" }}>
      <div className="container">
        <div className="row" style={{marginTop:'15%',marginLeft:'55px'}}>
          <div
            className="col-sm"
            style={{ backgroundColor: "white" }}
          >
            <h4>
              <b>Languages of {username.username}</b>
            </h4>
            <PieChart width={600} height={600}>
              <Pie
                data={programinglanguages}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {programinglanguages.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div
            className="col-sm"
            style={{ backgroundColor: "white" }}
          >
            <h4>
              <b>Verdicts of {username.username}</b>
            </h4>
            <PieChart width={600} height={600}>
              <Pie
                data={verdict}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {verdict.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div>
          <div className="container my-5" style={{ backgroundColor: "white",justifyContent:'center' }}>
            <center>
              <h4>
                <b>Tags of {username.username}</b>
              </h4>
              <PieChart width={800} height={800}>
      <Pie
        data={tags}
        cx={200}
        cy={200}
        innerRadius={170}
        outerRadius={200}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {tags.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
        ))}
      </Pie>
    
        {tags.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
        ))}
      <Tooltip/>
    </PieChart>
            </center>
          </div>
        </div>
        <div
          className="container"
          style={{ marginLeft: "30%", border: "2px black", marginRight: "30%" }}
        >
          <div className="my-5" style={{ backgroundColor: "white" }}>
            <h4>
              <b>Levels of {username.username}</b>
            </h4>
            <BarChart
              width={500}
              height={300}
              data={levels}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </div>

          <div className="my-5" style={{ backgroundColor: "white" }}>
            <h4>
              <b>Problem Ratings of {username.username}</b>
            </h4>
            <BarChart
              width={500}
              height={300}
              data={ratings}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />  
            </BarChart>
          </div>
        </div>
      </div>
      <Tables username={username.username} />
      
    </div>
    
      </>
  );
}

export default graphs;
