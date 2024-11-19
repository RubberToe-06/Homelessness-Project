import React, { useState, useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const demographicOptions = {
  overall: { label: "Overall", keys: ["overall"] },
  age: {
    label: "Age",
    keys: ["<18", "18-24", "25-34", "35-54", "55-64", ">64"],
  },
  race: {
    label: "Race/Ethnicity",
    keys: ["white", "black", "hispanic", "asian", "native", "pacific", "other"],
  },
  sexualOrientation: {
    label: "Sexual Orientation",
    keys: ["female", "male", "transgender", "nonbinary", "other"],
  },
};

const App = () => {
  const [selectedDemographic, setSelectedDemographic] = useState("overall");
  const [selectedState, setSelectedState] = useState("All States");
  const [chartData, setChartData] = useState({});
  const [states, setStates] = useState([]);

  const loadAllData = async () => {
    try {
      const years = Array.from({ length: 2023 - 2007 + 1 }, (_, i) => 2007 + i);

      const allData = await Promise.all(
        years.map(async (year) => {
          try {
            const data = await import(`../data/homelessness_data_${year}.js`);
            return { year, data: data.homelessnessData };
          } catch (err) {
            console.warn(`Data for year ${year} could not be loaded.`);
            return null; // Skip invalid year
          }
        })
      );

      const homelessnessData = {};

      // Combine all years into a single dataset
      allData
        .filter((entry) => entry) // Exclude nulls
        .forEach(({ year, data }) => {
          Object.entries(data).forEach(([state, stateData]) => {
            if (!homelessnessData[state]) {
              homelessnessData[state] = [];
            }
            if (stateData.years[year]) {
              homelessnessData[state].push({
                year,
                ...stateData.years[year],
              });
            }
          });
        });

      const allStates = Object.keys(homelessnessData);
      setStates(["All States", ...allStates]);

      return homelessnessData;
    } catch (error) {
      console.error("Error loading data:", error);
      setChartData({ error: "Failed to load data. Please try again later." });
    }
  };

  useEffect(() => {
    loadAllData().then((homelessnessData) => {
      if (!homelessnessData) return;
      console.log(homelessnessData);
      // Filter data for selected state
      const stateData =
        selectedState === "All States"
          ? Object.values(homelessnessData).flat()
          : homelessnessData[selectedState] || [];

      const demographicKeys = demographicOptions[selectedDemographic].keys;

      // Prepare chart data
      const datasets = demographicKeys.map((key) => {
        const groupedData = stateData.reduce(
          (acc, item) => {
            if (item.year) {
              acc.labels.push(item.year);
              acc.data.push(item[key]?.count || 0); // Default to 0 for missing data
            }
            return acc;
          },
          { labels: [], data: [] }
        );

        return {
          label: key.replace(/_/g, " ").toUpperCase(),
          data: groupedData.data,
          borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
          backgroundColor: `hsla(${Math.random() * 360}, 70%, 50%, 0.2)`,
          tension: 0.4,
        };
      });

      setChartData({
        labels: [...new Set(stateData.map((item) => item.year))].sort(),
        datasets,
      });
    });
  }, [selectedState, selectedDemographic]);

  return (
    <div className="container my-5">
      <div className="app-header text-center p-4 mb-4">
        <h1 className="text-white">Homelessness Data Dashboard</h1>
        <p className="text-light">
          Explore trends in homelessness across states and demographic groups.
        </p>
      </div>

      <div className="row my-4">
        {/* State Selector */}
        <div className="col-md-6">
          <label htmlFor="stateSelect" className="form-label">
            Select State:
          </label>
          <select
            id="stateSelect"
            className="form-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states
              .filter(
                (state) =>
                  state !==
                    "*File does not contain the imputed ages for people experiencing unsheltered homelessness over age 24 for the 22 CoCs that did not conduct an unsheltered count in 2023. Affected states and territories are: CA, GA, IL, MI, PR, and WA. " &&
                  state !== "Total"
              )
              .map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>

        {/* Demographic Selector */}
        <div className="col-md-6">
          <label htmlFor="demographicSelect" className="form-label">
            Select Demographic:
          </label>
          <select
            id="demographicSelect"
            className="form-select"
            value={selectedDemographic}
            onChange={(e) => setSelectedDemographic(e.target.value)}
          >
            {Object.entries(demographicOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-container mt-4">
        {/* Line Chart */}
        {chartData.error ? (
          <p className="text-center text-danger">{chartData.error}</p>
        ) : chartData.labels ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `Homelessness Trends (${demographicOptions[selectedDemographic].label}) in ${selectedState}*`,
                },
              },
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
                    text: "Population",
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-center">
            No data available for the selected options.
          </p>
        )}
      </div>
      <div className="text-center mt-4 disclaimer">
        <small>
          *2021 data is impacted by the COVID-19 pandemic and may not be fully
          representative.
        </small>
      </div>
    </div>
  );
};

export default App;
