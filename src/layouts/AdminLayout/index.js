import React from "react";
import { Link, Outlet } from "react-router-dom";
// Antd
import { Col, Row } from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
// style
import styles from "./AdminLayout.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const getItem = (label, icon, children, type) => ({
  icon,
  children,
  label,
  type,
});

const items = [
  getItem(
    <Link to="/admin/dashboard">Categories</Link>,
    <UnorderedListOutlined />
  ),
  getItem(<Link to="/admin/products">Products</Link>, <AppstoreOutlined />),
  getItem(<div>User</div>, <UserOutlined />),
];

const AdminLayout = () => {
  return (
    <Row>
      <Col span={4}>
        <Menu className={cx("menu")} mode="inline" items={items} />
      </Col>
      <Col span={20} style={{ marginLeft: -30 }}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AdminLayout;
