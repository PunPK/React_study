import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider, Button } from "antd";
import AddItem from "./components/AddItem";
import TransactionList from "./components/TransactionList";
import Modal from "./components/EditItem";
import axios from "axios";
import dayjs from "dayjs";

const URL_TXACTIONS = "/api/txactions";

function FinanceScreen() {
  const [summaryAmount, setSummaryAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [editData, setEditData] = useState(null);

  const openModal = (record) => {
    setEditData(record);
    setIsModalShow(true);
  };

  const closeModal = () => {
    setIsModalShow(false);
    setEditData(null);
  };

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      const data = response.data.data.map((row) => ({
        id: row.id,
        key: row.id,
        ...row.attributes,
      }));
      setTransactionData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNoteChanged = (id, note) => {
    setTransactionData(
      transactionData.map((transaction) => {
        transaction.note = transaction.id === id ? note : transaction.note;
        return transaction;
      })
    );
  };

  const handleRowDeleted = async (itemId) => {
    try {
      setIsLoading(true);
      await axios.delete(`${URL_TXACTIONS}/${itemId}`);
      fetchItems();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowEdited = async (item) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`${URL_TXACTIONS}/${item.id}`, {
        data: item,
      });
      fetchItems();
      const { id, attributes } = response.data.data;

      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes },
      ]);
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
      <header></header>
      <body className="App-finance-body">
        <Spin spinning={isLoading}>
          <Typography.Title>
            จำนวนเงินปัจจุบัน {summaryAmount} บาท
          </Typography.Title>

          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <TransactionList
            data={transactionData}
            onRowEdited={openModal}
            onNoteChanged={handleNoteChanged}
            onRowDeleted={handleRowDeleted}
          />
          {isModalShow && (
            <Modal
              defaultValue={editData}
              closeModal={closeModal}
              onSubmit={handleRowEdited}
            />
          )}
        </Spin>
      </body>
    </div>
  );
}

export default FinanceScreen;
