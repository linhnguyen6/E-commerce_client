import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

// Antd
import {
  Button,
  Form,
  Input,
  Select,
  Col,
  Modal,
  Upload,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
// API
import { read } from "../../../api/category";
import uploadImage from "../../../api/upload";
import { create } from "../../../api/product";
import Path from "../../../routes";

// Utils
import checkStatus from "../../../utils";
const { Option } = Select;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductAdd = () => {
  document.title = "Add product";

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = async () => {
    const { data } = await read();
    setCategories(data);
  };

  const redirect = () => navigate(Path.AdminProduct);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      toastr.error("Please input your image");
      return;
    }
    const { originFileObj } = fileList[0];
    const { status, data: dataImage } = await uploadImage(originFileObj);
    const createProduct = async () => {
      const { status } = await create({ ...values, image: dataImage.url });
      checkStatus(status, redirect);
    };
    checkStatus(status, createProduct);
  };

  const onFinishFailed = () => {
    toastr.error("Please check form");
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Col span={14}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select Category" }]}
          className="test"
        >
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {categories?.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Please enter the name product" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price" }]}
        >
          <InputNumber min={1} max={10000} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input your quantity" }]}
        >
          <InputNumber min={1} max={9999} />
        </Form.Item>
        <Form.Item
          label="Desc"
          name="desc"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea rows={5} placeholder="Please enter the description" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default ProductAdd;
