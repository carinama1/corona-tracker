import React, { useEffect, useState } from "react";
import sortingValue from "../../utils/sorting";
import { makeStyles } from "@material-ui/core";

import { Doughnut } from "react-chartjs-2";

const useStyle = makeStyles((theme) => ({
  root: {},
  itemContainer: {
    flex: 1,
    padding: 15,
    margin: 2,
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(255,255,255,0.1)",
    },
  },
}));

const options = ["Confirmed", "Deaths", "Recovered"];

const PieView = ({ data }) => {
  const classes = useStyle();
  const [activeOption, setActiveOption] = useState(0);
  const [usedData, setUsedData] = useState(data);
  const [pieData, setPieData] = useState({});
  const generateColor = (n, code) => {
    n = n % 4;
    const backgroundColor = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(0,255,0,0.2)",
    ];

    const borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(0,255,0,1)",
    ];

    if (code === 0) return backgroundColor[n];
    return borderColor[n];
  };

  const handleSwitchOption = (index) => {
    const options = ["confirmed", "deaths", "recovered"];
    const sortedValue = JSON.parse(JSON.stringify(data)).sort(
      sortingValue(options[index], "desc")
    );

    setUsedData(sortedValue);
  };

  const generateData = (key = "confirmed") => {
    let dataValue = {
      datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
      labels: [],
    };
    usedData.map((item, index) => {
      dataValue.datasets[0].data[index] = item[key];
      dataValue.datasets[0].backgroundColor[index] = generateColor(index, 0);
      dataValue.datasets[0].borderColor[index] = generateColor(index, 1);
      dataValue.labels[index] = item.countryName;
    });

    setPieData(dataValue);
  };

  useEffect(() => {
    generateData();
  }, []);

  useEffect(() => {
    const options = ["confirmed", "deaths", "recovered"];
    generateData(options[activeOption]);
  }, [usedData]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginBottom: 20,
      }}
    >
      <Doughnut
        data={pieData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          height: "70%",
          legend: {
            display: false,
          },
        }}
      />
      <div style={{ display: "flex", flex: 1, marginTop: 30 }}>
        {options.map((option, index) => {
          return (
            <div
              key={index}
              className={classes.itemContainer}
              style={
                activeOption === index
                  ? {
                      background: "rgba(255,255,255,0.1)",
                    }
                  : {}
              }
              onClick={() => {
                handleSwitchOption(index);
                setActiveOption(index);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieView;
