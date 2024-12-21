import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const Edit = ({ defaultValue, closeModal, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        id: defaultValue.id,
        username: defaultValue.username,
        email: defaultValue.email,
        firstname: defaultValue.firstname,
        lastname: defaultValue.lastname,
      });
    }
  }, [defaultValue, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const updatedRecord = {
        ...defaultValue,
        ...values,
      };
      // console.log("Updated Record:", updatedRecord);
      onSubmit(updatedRecord);
      closeModal();
    });
  };

  return (
    <Modal
      title="Edit transaction"
      open={true}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Edit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="ID" hidden>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="username"
          label="username"
          rules={[{ required: true, message: "กรุณาเลือกชนิด!" }]}
          layout="horizontal"
        >
          <Input.TextArea rows={1} />
        </Form.Item>

        <Form.Item
          name="email"
          label="email"
          rules={[{ required: true, message: "กรุณาเลือกชนิด!" }]}
          layout="horizontal"
        >
          <Input.TextArea rows={1} />
        </Form.Item>

        <Form.Item
          name="firstname"
          label="firstname"
          rules={[{ required: true, message: "กรุณาเลือกชนิด!" }]}
          layout="horizontal"
        >
          <Input.TextArea rows={1} />
        </Form.Item>

        {/* <Form.Item
          name="amount"
          label="จำนวนเงิน"
          rules={[{ required: true, message: "กรุณากรอกจำนวนเงิน!" }]}
        >
          <InputNumber placeholder="จํานวนเงิน" />
        </Form.Item> */}

        <Form.Item
          name="lastname"
          label="lastname"
          rules={[{ required: true, message: "กรุณากรอกหมายเหตุ!" }]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;
