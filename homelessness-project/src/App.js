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
    if (state === "All States" && category === "None") {
      data.push(homelessnessData2023.Total.years["2023"].overall.count);
      data.push(homelessnessData2022.Total.years["2022"].overall.count);
      data.push(homelessnessData2021.Total.years["2021"].overall.count);
      data.push(homelessnessData2020.Total.years["2020"].overall.count);
      data.push(homelessnessData2019.Total.years["2019"].overall.count);
      data.push(homelessnessData2018.Total.years["2018"].overall.count);
      data.push(homelessnessData2017.Total.years["2017"].overall.count);
      data.push(homelessnessData2016.Total.years["2016"].overall.count);
      data.push(homelessnessData2015.Total.years["2015"].overall.count);
      data.push(homelessnessData2014.Total.years["2014"].overall.count);
      data.push(homelessnessData2013.Total.years["2013"].overall.count);
      data.push(homelessnessData2012.Total.years["2012"].overall.count);
      data.push(homelessnessData2011.Total.years["2011"].overall.count);
      data.push(homelessnessData2010.Total.years["2010"].overall.count);
      data.push(homelessnessData2009.Total.years["2009"].overall.count);
      data.push(homelessnessData2008.Total.years["2008"].overall.count);
      data.push(homelessnessData2007.Total.years["2007"].overall.count);
    } else if (state === "All States") {
      data.push(
        homelessnessData2023.Total.years["2023"][category][subcategory].count
      );
      data.push(
        homelessnessData2022.Total.years["2022"][category][subcategory].count
      );
      data.push(
        homelessnessData2021.Total.years["2021"][category][subcategory].count
      );
      data.push(
        homelessnessData2020.Total.years["2020"][category][subcategory].count
      );
      data.push(
        homelessnessData2019.Total.years["2019"][category][subcategory].count
      );
      data.push(
        homelessnessData2018.Total.years["2018"][category][subcategory].count
      );
      data.push(
        homelessnessData2017.Total.years["2017"][category][subcategory].count
      );
      data.push(
        homelessnessData2016.Total.years["2016"][category][subcategory].count
      );
      data.push(
        homelessnessData2015.Total.years["2015"][category][subcategory].count
      );
      data.push(
        homelessnessData2014.Total.years["2014"][category][subcategory].count
      );
      data.push(
        homelessnessData2013.Total.years["2013"][category][subcategory].count
      );
      data.push(
        homelessnessData2012.Total.years["2012"][category][subcategory].count
      );
      data.push(
        homelessnessData2011.Total.years["2011"][category][subcategory].count
      );
      data.push(
        homelessnessData2010.Total.years["2010"][category][subcategory].count
      );
      data.push(
        homelessnessData2009.Total.years["2009"][category][subcategory].count
      );
      data.push(
        homelessnessData2008.Total.years["2008"][category][subcategory].count
      );
      data.push(
        homelessnessData2007.Total.years["2007"][category][subcategory].count
      );
    } else if (category === "None") {
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
    }
    return data;
  };

  useEffect(() => {
    if (selectedCategory === "None") {
      setDatasets([
        {
          label: "Overall",
          data: getData(selectedState, "None").reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
      ]);
    } else if (selectedCategory === "Race/Ethnicity") {
      setDatasets([
        {
          label: "White",
          data: getData(selectedState, "race", "white").reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
        {
          label: "Black or African American",
          data: getData(selectedState, "race", "black").reverse(),
          fill: false,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "American Indian or Alaska Native",
          data: getData(selectedState, "race", "hispanic").reverse(),
          fill: false,
          borderColor: "rgb(192, 192, 75)",
        },
        {
          label: "Asian",
          data: getData(selectedState, "race", "native").reverse(),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
        },
        {
          label: "Native Hawaiian or Other Pacific Islander",
          data: getData(selectedState, "race", "asian").reverse(),
          fill: false,
          borderColor: "rgb(192, 75, 192)",
        },
        {
          label: "Other",
          data: getData(selectedState, "race", "other").reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 75)",
        },
      ]);
    } else if (selectedCategory === "Gender Identity") {
      setDatasets([
        {
          label: "Male",
          data: getData(selectedState, "sexualOrientation", "male").reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
        {
          label: "Female",
          data: getData(selectedState, "sexualOrientation", "female").reverse(),
          fill: false,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "Transgender",
          data: getData(
            selectedState,
            "sexualOrientation",
            "transgender"
          ).reverse(),
          fill: false,
          borderColor: "rgb(192, 192, 75)",
        },
        {
          label: "Nonbinary",
          data: getData(
            selectedState,
            "sexualOrientation",
            "nonbinary"
          ).reverse(),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
        },
      ]);
    } else if (selectedCategory === "Age") {
      setDatasets([
        {
          label: "Under 18",
          data: getData(selectedState, "age", "under18").reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
        {
          label: "18-24",
          data: getData(selectedState, "age", "18-24").reverse(),
          fill: false,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "25-34",
          data: getData(selectedState, "age", "from25to34").reverse(),
          fill: false,
          borderColor: "rgb(192, 192, 75)",
        },
        {
          label: "35-44",
          data: getData(selectedState, "age", "from35to54").reverse(),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
        },
        {
          label: "55-64",
          data: getData(selectedState, "age", "from55to64").reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 75)",
        },
        {
          label: "64+",
          data: getData(selectedState, "age", "over64").reverse(),
          fill: false,
          borderColor: "rgb(75, 75, 192)",
        },
      ]);
    }
  }, [selectedState, selectedCategory]);

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

  let stateNames = Object.keys(homelessnessData2023);
  stateNames.pop(); // remove the "total" key
  stateNames.pop(); // remove the weird key
  stateNames = stateNames.filter(
    (stateName) => stateName !== "AS" && stateName !== "MP"
  ); // remove the territories with no data

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
      <small className="disclaimer">
        Some data is missing for certain years and states; and from certain
        demographic categories.
      </small>
    </div>
  );
}
