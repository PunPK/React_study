// import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import Bar from "../components/Navbar";
import { Doughnut, Line } from "react-chartjs-2";
import "./dashborad.css";
import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider, Button } from "antd";
// import AddItem from "../components/AddItem";
// import EditDataList from "../tables/editDataList";
// import Modal from "../components/EditItem";
import axios from "axios";
// import dayjs from "dayjs";
// import Bar from "../components/Navbar";

const URL_TXACTIONS = "/api/txactions";

// import revenueData from "./data/revenueData.json";
// import sourceData from "./data/sourceData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      const data = response.data.data.map((row) => ({
        id: row.id,
        key: row.id,
        ...row.attributes,
      }));
      console.log(data);
      setTransactionData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const newSummary = transactionData.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount;
        } else if (transaction.type === "expense") {
          acc.expense += transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    setSummary(newSummary);
  }, [transactionData]);
  return (
    <div className="App">
      <Bar></Bar>
      <Spin spinning={isLoading}>
        <Typography.Title>
          จำนวนเงินปัจจุบัน {summary.income - summary.expense} บาท
        </Typography.Title>
        <Divider>บันทึก รายรับ - รายจ่าย</Divider>
        {/* <div className="dataCard revenueCard">
        <Line
          data={{
            labels: ["A", "B", "C"],
            datasets: [
              {
                label: "Count",
                data: [100, 200, 300],
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
      </div> */}

        {/* <div className="dataCard customerCard">
        <Bar
          data={{
            labels: ["A", "B", "C"],
            datasets: [
              {
                label: "Count",
                data: [100, 200, 300],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
        />
      </div> */}

        <div className="dataCard categoryCard">
          <Doughnut
            data={{
              labels: ["income", "expense"],
              datasets: [
                {
                  label: "Count",
                  data: [summary.income, summary.expense],
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                  borderColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
      </Spin>
    </div>
  );
};
