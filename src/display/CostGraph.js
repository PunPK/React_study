// import React from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
import Bar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import "./dashborad.css";
import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider } from "antd";
// import AddItem from "../components/AddItem";
// import EditDataList from "../tables/editDataList";
// import Modal from "../components/EditItem";
import axios from "axios";
// import dayjs from "dayjs";
// import Bar from "../components/Navbar";

const URL_TXACTIONS = "/api/txactions";

export const CostGraph = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [labels, setLabels] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      const data = response.data.data;
      // console.log("Data", data);
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
    // console.log("len", transactionData.length);
    if (transactionData.length === 0) {
      return;
    }

    const dailyTotal = transactionData.reduce((acc, { attributes }) => {
      const date = new Date(attributes.action_datetime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { income: 0, expense: 0 };
      }

      // console.log("type", attributes.type);
      if (attributes.type === "income") {
        acc[date].income += attributes.amount;
      } else if (attributes.type === "expense") {
        acc[date].expense += attributes.amount;
      }

      return acc;
    }, {});

    const newLabels = Object.keys(dailyTotal);
    if (newLabels.length === 0) {
      console.log("No valid transaction data found.");
      return;
    }

    setLabels(newLabels);
    setIncomeData(newLabels.map((date) => dailyTotal[date].income));
    setExpenseData(newLabels.map((date) => dailyTotal[date].expense));
  }, [transactionData]);

  // useEffect(() => {
  //   console.log("Data");
  //   console.log(labels);
  //   console.log(incomeData);
  //   console.log(expenseData);
  // }, []);

  return (
    <div className="App">
      <Bar></Bar>
      <Spin spinning={isLoading}>
        <Typography.Title>
          {/* จำนวนเงินปัจจุบัน {incomeData - expenseData} บาท */}
        </Typography.Title>
        <Divider>บันทึก รายรับ - รายจ่าย</Divider>
        <div className="dataCard revenueCard">
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: "income",
                  data: incomeData,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(43, 63, 229, 0.8)",
                  borderWidth: 2,
                },
                {
                  label: "expense",
                  data: expenseData,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 2,
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
                  text: "Cost Graph",
                },
              },
            }}
          />
        </div>
      </Spin>
    </div>
  );
};
