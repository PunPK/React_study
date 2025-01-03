import { React } from "react";
import { Button, Table, Space, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function EditDataList(props) {
  const columns = [
    {
      title: "Date-Time",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) =>
        dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <Tag color={record.type === "income" ? "green" : "red"}>
          {record.type}
        </Tag>
      ),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Edit the transaction"
            description="Are you sure to Edit this transaction?"
            onConfirm={() => props.onRowEdited(record)}
          >
            <Button
              // danger
              type="primary"
              shape="circle"
              icon={<EditOutlined twoToneColor="#eb2f96" />}
            />
          </Popconfirm>
          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => props.onRowDeleted(record.id)}
          >
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={props.data} />
      {/* <td>
        <input
          value={transition.note}
          onChange={(evt) => {
            props.onNoteChanged(transition.id, evt.target.value);
          }}
        />
      </td> */}
    </>
  );
}
