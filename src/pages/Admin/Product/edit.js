import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import Path from "../../../routes";
import checkStatus from "../../../utils";
// API
import { read } from "../../../api/category";
import uploadImage from "../../../api/upload";
import { update, show } from "../../../api/product";
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

const { Option } = Select;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductEdit = () => {
  document.title = "Edit product";

  const { id } = useParams();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [product, setProduct] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListCategory();
    getProduct(id);
  }, [id]);

  const getListCategory = async () => {
    const { data } = await read();
    setCategories(data);
  };

  const getProduct = async (id) => {
    const { data } = await show(id);
    setProduct(data);
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: data.image,
      },
    ]);
  };

  const redirect = () => navigate(Path.AdminProduct);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      toastr.error("Please input your image");
      return;
    }

    if (fileList[0].url === product.image) {
      const { status } = await update({ ...values, image: product.image, id });
      checkStatus(status, redirect);
    } else {
      const { originFileObj } = fileList[0];
      const { status, data: dataImage } = await uploadImage(originFileObj);
      const updateProduct = async () => {
        const { status } = await update({
          ...values,
          image: dataImage.url,
          id,
        });
        checkStatus(status, redirect);
      };
      checkStatus(status, updateProduct);
    }
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

  return product ? (
    <Col span={14}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{
          price: product.price,
          quantity: product.quantity,
          categoryId: product.category.id,
          name: product.name,
          desc: product.desc,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select Category" }]}
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
  ) : null;
};

export default ProductEdit;
