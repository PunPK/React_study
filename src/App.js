import "./App.css";
import TransactionList from "./components/TransactionList";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button, Table, Tag } from "antd";
import AddItem from "./components/AddItem";

function App() {
  const [transactionData, setTransactionData] = useState([
    {
      id: 1,
      created: "01/02/2021 - 08:30",
      type: "income",
      amount: 20000,
      note: "allowance",
    },
    {
      id: 2,
      created: "01/02/2021 - 10:30",
      type: "expense",
      amount: 150,
      note: "อาหารเที่ยง",
    },
  ]);
  const [amount, setAmount] = useState(calculateCurrentAmount(transactionData));

  function calculateCurrentAmount(trxData) {
    return trxData.reduce(
      (sum, transaction) =>
        transaction.type === "income"
          ? (sum += transaction.amount)
          : (sum -= transaction.amount),
      0
    );
  }
  useEffect(() => {
    console.log(transactionData);
    setAmount(
      transactionData.reduce(
        (sum, transaction) =>
          transaction.type === "income"
            ? (sum += transaction.amount)
            : (sum -= transaction.amount),
        0
      )
    );
  }, [transactionData]);
  const handleNoteChanged = (id, note) => {
    setTransactionData(
      transactionData.map((transaction) => {
        transaction.note = transaction.id === id ? note : transaction.note;
        return transaction;
      })
    );
  };

  const handleAddItem = (itemData) => {
    setTransactionData([
      ...transactionData,
      {
        id: transactionData.length + 1,
        created: dayjs().format("DD/MM/YYYY - HH:mm"),
        ...itemData,
      },
    ]);
  };

  const handleRowDelete = (id) => {
    setTransactionData(transactionData.filter((trx) => trx.id !== id));
  };

  // id: 1,
  // created: "01/02/2021 - 08:30",
  // type: "income",
  // amount: 20000,
  // note: "allowance",
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id) => <a>{id}</a>,
    },
    {
      title: "created",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "type",
      dataIndex: "type",
      // key: "type",
      // render: (_, record) => {
      //   const types = record.types || []; // ตรวจสอบว่า types มีค่าหรือไม่ ถ้าไม่มี ให้ใช้ array ว่าง
      //   return (
      //     <>
      //       {types.map((transaction, index) => {
      //         let color = transaction.type === "income" ? "green" : "red";
      //         if (transaction.type === "loser") {
      //           color = "volcano";
      //         }
      //         return (
      //           <Tag color={color} key={`${transaction.type}-${index}`}>
      //             {transaction.type.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   );
      // },
    },
    {
      title: "amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "note",
      key: "note",
      dataIndex: "note",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        {amount >= 10000 && (
          <p style={{ color: "green" }}>Wow you're so rich - {amount}</p>
        )}
        {amount < 10000 && (
          <p style={{ color: "red" }}>So Poor... - {amount}</p>
        )}
        <AddItem onItemAdded={handleAddItem} />
        {/* <TransactionList
          data={transactionData}
          onNoteChanged={handleNoteChanged}
          onRowDeleted={handleRowDelete}
        /> */}
        <Table columns={columns} dataSource={transactionData} />
      </header>
    </div>
  );
}

export default App;

// import logo from "./logo.svg";
// import "./App.css";
// import TransactionList from "./components/TransactionList";
// import { useState, useEffect } from "react";
// import Clock from "./components/Clock";

// function App() {
//   //DATA
//   const transactionData = [
//     {
//       id: 1,
//       created: "01/02/2021 - 08:30",
//       type: "รายรับ",
//       amount: 20000,
//       note: "allowance",
//     },
//     {
//       id: 2,
//       created: "01/02/2021 - 10:30",
//       type: "รายจ่าย",
//       amount: 150,
//       note: "อาหารเที่ยง",
//     },
//     {
//       id: 3,
//       created: "02/02/2022 - 11:35",
//       type: "รายรับ",
//       amount: 1900,
//       note: "อาหารเย็น",
//     },
//   ];
//   const summary = () => {
//     const currentAmount = transactionData.reduce(
//       (sum, transaction) => (sum += transaction.amount),
//       0
//     );
//     if (currentAmount > 10000) {
//       return (
//         <p style={{ color: "green" }}>Wow you're so rich - {currentAmount}</p>
//       );
//     } else {
//       return <p style={{ color: "red" }}>So Poor... - {currentAmount}</p>;
//     }
//   };

//   const [counter, setCounter] = useState(0);
//   const counterClicked = () => {
//     console.log(`Clicked ${counter}`);
//     setCounter(counter + 1);
//   };

//   const generateTransaction = () => {
//     return {
//       id: transactionData.length + 1,
//       created: new Date().toLocaleString(),
//       type: ["รายรับ", "รายจ่าย"][Math.floor(Math.random() * 2)],
//       amount: Math.floor(Math.floor(Math.random() * 1000) + 1),
//       note: "",
//     };
//   };

//   useEffect(() => {
//     console.log("Effect counter : $(counter)");
//   }, [counter]);

//   useEffect(() => {
//     console.log("Effect counter call!!!!!!!!");
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Clock />
//         {`Clicked ${counter}`}
//         <button onClick={counterClicked}>Add Counter</button>
//         {summary()}
//         <TransactionList data={transactionData} />
//       </header>
//     </div>
//   );
// }
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Logo */}
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           {/* Link */}
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//         // img
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function App() {
//   return (
//   <div className="App">
//     <header className="App-header">
//       <table border="1">
//         <tr>
//           <th>Date-Time</th>
//           <th>Type</th>
//           <th>amount</th>
//           <th>note</th>
//         </tr>
//         <tr>
//           <td>01/02/2021 - 08:30</td>
//           <td>รายรับ</td>
//           <td>20,000</td>
//           <td>allowance</td>
//         </tr>
//         <tr>
//           <td>01/02/2021 - 10:30</td>
//           <td>รายจ่าย</td>
//           <td>150</td>
//           <td>อาหารเที่ยง</td>
//         </tr>
//       </table>
//     </header>
//   </div>
//  );
// }
// export default App;
