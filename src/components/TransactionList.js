export default function TransactionList(props) {
  const generateRows = () => {
    //ใช้งาน props ส่งผ่านค่ามา
    // console.log(props.name);
    if (props.data != null) {
      return props.data.map((transaction) => (
        <tr
          bgcolor={transaction.type === "income" ? "green" : "red"}
          key={transaction.id}
        >
          <td>{transaction.created}</td>
          <td>{transaction.type}</td>
          <td>{transaction.amount}</td>
          <td>
            <input
              value={transaction.note}
              onChange={(evt) => {
                props.onNoteChanged(transaction.id, evt.target.value);
              }}
            />
          </td>
          <td>
            <button onClick={() => alert(deleteTransaction(transaction.id))}>
              ลบ
            </button>
          </td>
        </tr>
      ));
    } else {
      return null;
    }
  };
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date-Time</th>
          <th>Type</th>
          <th>amount</th>
          <th>note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{generateRows()}</tbody>
    </table>
  );
}
