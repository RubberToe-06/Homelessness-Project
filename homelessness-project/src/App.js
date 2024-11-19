import React, { useEffect } from "react";
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
  plugins,
} from "chart.js";
import { homelessnessData2023 } from "./data/homelessness_data_2023";
import { homelessnessData2022 } from "./data/homelessness_data_2022";
import { homelessnessData2021 } from "./data/homelessness_data_2021";
import { homelessnessData2020 } from "./data/homelessness_data_2020";
import { homelessnessData2019 } from "./data/homelessness_data_2019";
import { homelessnessData2018 } from "./data/homelessness_data_2018";
import { homelessnessData2017 } from "./data/homelessness_data_2017";
import { homelessnessData2016 } from "./data/homelessness_data_2016";
import { homelessnessData2015 } from "./data/homelessness_data_2015";
import { homelessnessData2014 } from "./data/homelessness_data_2014";
import { homelessnessData2013 } from "./data/homelessness_data_2013";
import { homelessnessData2012 } from "./data/homelessness_data_2012";
import { homelessnessData2011 } from "./data/homelessness_data_2011";
import { homelessnessData2010 } from "./data/homelessness_data_2010";
import { homelessnessData2009 } from "./data/homelessness_data_2009";
import { homelessnessData2008 } from "./data/homelessness_data_2008";
import { homelessnessData2007 } from "./data/homelessness_data_2007";

export default function App() {
  const [selectedState, setSelectedState] = React.useState("All States");
  const [selectedCategory, setSelectedCategory] = React.useState("None");
  const [datasets, setDatasets] = React.useState([]);

  useEffect(() => {
    setDatasets(generateDatasets(selectedState, selectedCategory));
  }, [selectedState, selectedCategory]);

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

  const getData = (state, category, subcategory = "none") => {
    const data = [];
    if (category === "None") {
      data.push(homelessnessData2023[state].years["2023"].overall.count);
      data.push(homelessnessData2022[state].years["2022"].overall.count);
      data.push(homelessnessData2021[state].years["2021"].overall.count);
      data.push(homelessnessData2020[state].years["2020"].overall.count);
      data.push(homelessnessData2019[state].years["2019"].overall.count);
      data.push(homelessnessData2018[state].years["2018"].overall.count);
      data.push(homelessnessData2017[state].years["2017"].overall.count);
      data.push(homelessnessData2016[state].years["2016"].overall.count);
      data.push(homelessnessData2015[state].years["2015"].overall.count);
      data.push(homelessnessData2014[state].years["2014"].overall.count);
      data.push(homelessnessData2013[state].years["2013"].overall.count);
      data.push(homelessnessData2012[state].years["2012"].overall.count);
      data.push(homelessnessData2011[state].years["2011"].overall.count);
      data.push(homelessnessData2010[state].years["2010"].overall.count);
      data.push(homelessnessData2009[state].years["2009"].overall.count);
      data.push(homelessnessData2008[state].years["2008"].overall.count);
      data.push(homelessnessData2007[state].years["2007"].overall.count);
    } else {
      data.push(
        homelessnessData2023[state].years["2023"][category][subcategory].count
      );
      data.push(
        homelessnessData2022[state].years["2022"][category][subcategory].count
      );
      data.push(
        homelessnessData2021[state].years["2021"][category][subcategory].count
      );
      data.push(
        homelessnessData2020[state].years["2020"][category][subcategory].count
      );
      data.push(
        homelessnessData2019[state].years["2019"][category][subcategory].count
      );
      data.push(
        homelessnessData2018[state].years["2018"][category][subcategory].count
      );
      data.push(
        homelessnessData2017[state].years["2017"][category][subcategory].count
      );
      data.push(
        homelessnessData2016[state].years["2016"][category][subcategory].count
      );
      data.push(
        homelessnessData2015[state].years["2015"][category][subcategory].count
      );
      data.push(
        homelessnessData2014[state].years["2014"][category][subcategory].count
      );
      data.push(
        homelessnessData2013[state].years["2013"][category][subcategory].count
      );
      data.push(
        homelessnessData2012[state].years["2012"][category][subcategory].count
      );
      data.push(
        homelessnessData2011[state].years["2011"][category][subcategory].count
      );
      data.push(
        homelessnessData2010[state].years["2010"][category][subcategory].count
      );
      data.push(
        homelessnessData2009[state].years["2009"][category][subcategory].count
      );
      data.push(
        homelessnessData2008[state].years["2008"][category][subcategory].count
      );
      data.push(
        homelessnessData2007[state].years["2007"][category][subcategory].count
      );
      return data;
    }
  };

  // Create the data object
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

  // Create the options object
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Homelessness Population (" + selectedState + ")",
      },
    },
  };

  const stateNames = Object.keys(homelessnessData2023);
  stateNames.pop(); // remove the "total" key
  stateNames.pop(); // remove the weird key

  // Add the "All States" option to the beginning of the array
  stateNames.unshift("All States");

  return (
    <div>
      <h1>React App</h1>
      <h2>State</h2>
      <select
        onChange={(selection) => {
          setSelectedState(selection.target.value);
          console.log(selection.target.value);
        }}
      >
        {stateNames.map((stateName) => (
          <option key={stateName}>{stateName}</option>
        ))}
      </select>
      <h2>Category</h2>
      <select
        onChange={(selection) => {
          setSelectedCategory(selection.target.value);
          console.log(selection.target.value);
        }}
      >
        <option>None</option>
        <option>Race/Ethnicity</option>
        <option>Gender Identity</option>
        <option>Age</option>
      </select>
      <Line data={data} options={options} />
    </div>
  );
}
