import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
// style
import styles from "./Category.module.css";
import classNames from "classnames/bind";
// API
import { destroy, read } from "../../../api/category";
import checkStatus from "../../../utils";
const cx = classNames.bind(styles);

const CategoryAdmin = () => {
  document.title = "List Category";
  // Local state
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const confirm = async (categoryId) => {
    const { status } = await destroy(categoryId);
    checkStatus(status, getCategories);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className={cx("form-search")}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
            <meta httpEquiv="X-UA-Compatible" content="IE=7" />
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "30%",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Length Product",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const getCategories = async () => {
    const { data } = await read();
    setCategories(data);
  };

  const data = categories.map((category, index) => ({
    key: index,
    category: category.name,
    quantity: category.products.length,
    action: (
      <Space size="middle">
        <Link to={`/admin/categories/${category.id}/edit`}>Edit</Link>
        <Popconfirm
          placement="top"
          title={"Sure to delete?"}
          onConfirm={() => confirm(category.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  }));

  if (categories) {
    return (
      <>
        <Link to={"/admin/categories/add"}>
          <Button type="primary" htmlType="submit" className={cx("btn-add")}>
            Add
          </Button>
        </Link>
        <Table columns={columns} dataSource={data} />;
      </>
    );
  }

  return null;
};

export default CategoryAdmin;
