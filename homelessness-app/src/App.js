import "./App.css";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

function App() {
  const [stateNames, setStateNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("None");

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const readXlsbFile = async (
    fileUrl = `${process.env.PUBLIC_URL}/PIT-Counts.xlsb`,
    sheetIndex = 0
  ) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      setLoading(true);
      console.log("reading xlsb file");
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      // Get the sheet name using the provided index
      const sheetName = workbook.SheetNames[sheetIndex];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setLoading(false);
      return jsonData;
    } catch (error) {
      console.error("Error reading xlsb file:", error);
    }
  };

  // Read the xlsb file and log the data
  useEffect(() => {
    const fileUrl = `${process.env.PUBLIC_URL}/PIT-Counts.xlsb`;
    readXlsbFile(fileUrl, 1).then((data) => {
      console.log(data);

      // Create a new stateNames array by removing the last 2 elements and adding "All States" at the beginning.
      const modifiedStateNames = [
        "All States",
        ...data.slice(0, -2).map((item) => item["State"]),
      ];

      // Set the state with the modified array
      setStateNames(modifiedStateNames);
    });
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Homeless Count",
        },
      },
    },
  };

  const data = {
    labels: [
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
    datasets: [
      {
        label: "Overall Homeless",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
    ],
  };

  return loading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div className="App">
      <h1>React App</h1>
      <select
        onChange={(option) => {
          setSelectedState(option.target.value);
          console.log(
            "Selected: " + selectedCategory + ", " + option.target.value
          );
        }}
      >
        {stateNames.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        onChange={(option) => {
          setSelectedCategory(option.target.value);
          console.log(
            "Selected: " + option.target.value + ", " + selectedState
          );
        }}
      >
        <option value="None">None</option>
        <option value="Race/Ethnicity">Race/Ethnicity</option>
        <option value="Age">Age</option>
        <option value="Gender Identity">Gender Identity</option>
      </select>
      <Line options={options} data={data} className="graph" />
    </div>
  );
}

export default App;
