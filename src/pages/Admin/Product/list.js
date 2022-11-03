import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import checkStatus from "../../../utils";
// Antd
import { Space, Table, Image, Popconfirm, Button } from "antd";
// API
import { destroy, read } from "../../../api/product";
// style
import styles from "./Product.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data } = await read();
    setProducts(data);
  };

  const handleRemoveProduct = async (id) => {
    const { status } = await destroy(id);
    checkStatus(status, getProducts);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Desc",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Space size="middle">
          <Link to={`/admin/products/${product.tags}/edit`}>Edit</Link>
          <Popconfirm
            placement="bottom"
            title="Are you sure delete ?"
            onConfirm={() => {
              handleRemoveProduct(product.tags);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataTable = products?.map((product) => ({
    key: product.id,
    name: product.name,
    price: product.price,
    desc: <p className={cx("truncate")}>{product.desc}</p>,
    image: <Image src={product.image} width={50} height={50} />,
    tags: product.id,
  }));

  return (
    <>
      <Link to={"/admin/products/add"}>
        <Button type="primary" htmlType="submit" className={cx("btn-add")}>
          Add
        </Button>
      </Link>
      <Table columns={columns} dataSource={dataTable} />
    </>
  );
};

export default ProductAdmin;
