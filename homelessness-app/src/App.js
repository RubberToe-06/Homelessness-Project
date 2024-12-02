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
  const [datasets, setDatasets] = useState([]);
  const fileUrl = `${process.env.PUBLIC_URL}/PIT-Counts.xlsb`;

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

      // Set the initial data to "All States" and "None"
    });
  }, []);

  useEffect(() => {
    generateDatasets(selectedState, selectedCategory);
  }, [selectedState, selectedCategory]);

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
    datasets: datasets,
  };

  // TODO: Implement the fetchData function
  const fetchData = (state, category, subCategory = "None") => {
    const data = [];
    if (category === "None" && state === "All States") {
      for (let i = 1; i < 18; i++) {
        readXlsbFile(fileUrl, i).then((jsonData) => {
          data.push(jsonData[56]["Overall Homeless"]);
        });
      }
    } else if (category === "None" && state !== "All States") {
      for (let i = 1; i < 18; i++) {
        readXlsbFile(fileUrl, i).then((jsonData) => {
          data.push(
            jsonData.filter((item) => item["State"] === state)[0][
              "Overall Homeless"
            ]
          );
        });
      }
    } else if (category !== "None" && state === "All States") {
      for (let i = 1; i < 18; i++) {
        readXlsbFile(fileUrl, i).then((jsonData) => {
          data.push(
            jsonData.filter((item) => item[category] === subCategory)[0][
              "Overall Homeless"
            ]
          );
        });
      }
    }
    return data;
  };
  const generateDatasets = (state, category) => {
    const datasets = [];
    if (category === "None") {
      datasets.push({
        label: "Total Homeless Count",
        data: fetchData(state, category),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      });
    } else {
      if (category === "Race/Ethnicity") {
        datasets.push({
          label: "White",
          data: fetchData(state, category, "White"),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "Black/African American",
          data: fetchData(state, category, "Black or African American"),
          fill: false,
          borderColor: "rgb(192, 75, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "American Indian/Alaska Native",
          data: fetchData(state, category, "American Indian or Alaska Native"),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "Asian",
          data: fetchData(state, category, "Asian"),
          fill: false,
          borderColor: "rgb(192, 192, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "Native Hawaiian or Other Pacific Islander",
          data: fetchData(
            state,
            category,
            "Native Hawaiian or Other Pacific Islander"
          ),
          fill: false,
          borderColor: "rgb(192, 75, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "Hispanic/Latinx",
          data: fetchData(state, category, "Hispanic or Latinx"),
          fill: false,
          borderColor: "rgb(75, 192, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "Multiple Races",
          data: fetchData(state, category, "Multiple Races"),
          fill: false,
          borderColor: "rgb(75, 75, 75)",
          tension: 0.1,
        });
      } else if (category === "Age") {
        datasets.push({
          label: "Under 18",
          data: fetchData(state, category, "Under 18"),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "18-24",
          data: fetchData(state, category, "18-24"),
          fill: false,
          borderColor: "rgb(192, 75, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "25-34",
          data: fetchData(state, category, "25-34"),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "35-44",
          data: fetchData(state, category, "35-44"),
          fill: false,
          borderColor: "rgb(192, 192, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "45-54",
          data: fetchData(state, category, "25-34"),
          fill: false,
          borderColor: "rgb(75, 192, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "55-64",
          data: fetchData(state, category, "55-64"),
          fill: false,
          borderColor: "rgb(192, 75, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "65+",
          data: fetchData(state, category, "65+"),
          fill: false,
          borderColor: "rgb(75, 75, 75)",
          tension: 0.1,
        });
      } else if (category === "Gender Identity") {
        datasets.push({
          label: "Male",
          data: fetchData(state, category, "Male"),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "Female",
          data: fetchData(state, category, "Female"),
          fill: false,
          borderColor: "rgb(192, 75, 75)",
          tension: 0.1,
        });
        datasets.push({
          label: "Transgender",
          data: fetchData(state, category, "Transgender"),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
          tension: 0.1,
        });
        datasets.push({
          label: "Non-Binary",
          data: fetchData(state, category, "Non-Binary"),
          fill: false,
          borderColor: "rgb(192, 192, 75)",
          tension: 0.1,
        });
      }
    }
    setDatasets(datasets);
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
