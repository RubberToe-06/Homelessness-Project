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
} from "chart.js";
import { useEffect, useState } from "react";

function App() {
  const [dataset, setDataset] = useState([]);
  const [category, setCategory] = useState("None");
  const [state, setState] = useState("Overall");
  const [datasets, setDatasets] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const readXlsbFile = async (fileUrl, sheetIndex = 0) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      // Get the sheet name using the provided index
      const sheetName = workbook.SheetNames[sheetIndex];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      return jsonData;
    } catch (error) {
      console.error("Error reading xlsb file:", error);
    }
  };

  const generateStateNames = (dataset) => {
    const stateNames = [];
    dataset.forEach((data) => {
      stateNames.push(data.State);
    });
    stateNames.pop();
    stateNames.pop();
    stateNames.unshift("All States");
    return stateNames;
  };

  const getData = (state, category, subCategory = "none") => {
    if (state === "All States" && category === "None") {
      const data = [];
      for (let i = 1; i < 18; i++) {
        const dataset = readXlsbFile(
          `${process.env.PUBLIC_URL}/PIT-Counts.xlsb`,
          i
        );
        data.push(dataset["Total"]["Overall Homeless"]);
      }
      return data;
    } else if (state === "All States" && category !== "None") {
      const data = [];
      for (let i = 1; i < 18; i++) {
        const dataset = readXlsbFile(
          `${process.env.PUBLIC_URL}/PIT-Counts.xlsb`,
          i
        );
        switch (category) {
          case "Age":
            switch (subCategory) {
              case "<18":
                data.push(dataset["Total"]["Overall Homeless - Under 18"]);
                break;
              case "18-24":
                data.push(dataset["Total"]["Overall Homeless - Age 18 to 24"]);
                break;
              case "25-34":
                data.push(dataset["Total"]["Overall Homeless - Age 25 to 34"]);
                break;
              case "35-44":
                data.push(dataset["Total"]["Overall Homeless - Age 35 to 44"]);
                break;
              case "45-54":
                data.push(dataset["Total"]["Overall Homeless - Age 45 to 54"]);
                break;
              case "55-64":
                data.push(dataset["Total"]["Overall Homeless - Age 55 to 64"]);
                break;
              case ">64":
                data.push(dataset["Total"]["Overall Homeless - Over 64"]);
                break;

              default:
                break;
            }
            break;
          case "Gender Identity":
            switch (subCategory) {
              default:
                break;
            }
            break;
          default:
            break;
        }
      }
      return data;
    }
  };

  const generateDatasets = (state, category) => {
    const datasets = [];
    if (category === "None" && state === "Overall") {
      datasets.push({
        label: "Overall",
        data: getData("Overall", "None"),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      });
    }

    setDatasets(datasets);
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
    datasets: datasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  useEffect(() => {
    generateDatasets(state, category);
  }, [state, category]);

  return (
    <div className="App">
      <h1>React App</h1>
      <select>
        <option value="None" onClick={() => setCategory("None")}>
          None
        </option>
        <option value="Age" onClick={() => setCategory("Age")}>
          Age
        </option>
        <option
          value="Race/Ethnicity"
          onClick={() => setCategory("Race/Ethnicity")}
        >
          Race/Ethnicity
        </option>
        <option
          value="Gender Identity"
          onClick={() => setCategory("Gender Identity")}
        >
          Gender Identity
        </option>
      </select>

      {/*Get the state abbreviations from the dataset*/}
      <select>
        {generateStateNames(dataset).map((stateName) => {
          return (
            <option
              key={stateName}
              value={stateName}
              onClick={() => setState(stateName)}
            >
              {stateName}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          // Ensure the file is in the "public" folder for the fetch to work
          const fileUrl = `${process.env.PUBLIC_URL}/PIT-Counts.xlsb`;
          readXlsbFile(fileUrl, 1);
        }}
      >
        Read XLSB File
      </button>
      <Line options={options} data={data} className="graph" />
    </div>
  );
}

export default App;
