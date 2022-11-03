import { Button, Col, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// API
import { getOne, update } from "../../../api/category";
import Path from "../../../routes";
import checkStatus from "../../../utils";

const CategoryEdit = () => {
  document.title = "Update Category";
  const { id } = useParams();

  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await getOne(id);
      setCategory(data);
    };

    getCategory();
  }, [id]);

  const redirect = () => navigate(Path.AdminDashBoard);

  const onFinish = async (values) => {
    const { status } = await update({ ...values, id });
    checkStatus(status, redirect);
  };

  return category ? (
    <Col span={8} offset={1}>
      <Form
        name="basic"
        initialValues={{
          name: category.name,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  ) : null;
};

export default CategoryEdit;
