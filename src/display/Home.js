import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider } from "antd";
// import AddItem from "../components/AddItem";
import TransactionList from "../tables/TransactionList";
// import Modal from "../components/EditItem";
import axios from "axios";
// import dayjs from "dayjs";
import Bar from "../components/Navbar";

const URL_TXACTIONS = "/api/txactions";

function HomePage() {
  const [summaryAmount, setSummaryAmount] = useState(0);
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
      // console.log(data);
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
    setSummaryAmount(
      transactionData.reduce(
        (sum, transaction) =>
          transaction.type === "income"
            ? sum + transaction.amount
            : sum - transaction.amount,
        0
      )
    );
  }, [transactionData]);

  return (
    <div className="App">
      <Bar></Bar>
      <body className="App-finance-body">
        <Spin spinning={isLoading}>
          <Typography.Title>
            จำนวนเงินปัจจุบัน {summaryAmount} บาท
          </Typography.Title>

          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <TransactionList data={transactionData} />
        </Spin>
      </body>
    </div>
  );
}

export default HomePage;
