import React from "react";
import { Link, Outlet } from "react-router-dom";
import Path from "../../routes";
// Antd
import { Col, Row, Menu } from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined
} from "@ant-design/icons";

const getItem = (label, icon, children, type) => ({
  icon,
  children,
  label,
  type
});

const items = [
  getItem(
    <Link to={Path.AdminDashBoard}>Categories</Link>,
    <UnorderedListOutlined />
  ),
  getItem(<Link to={Path.AdminProduct}>Products</Link>, <AppstoreOutlined />),
  getItem(<div>User</div>, <UserOutlined />)
];

const AdminLayout = () => {
  return (
    <Row>
      <Col xl={{ span: 3 }} lg={{ span: 2 }} md={{ span: 4 }}>
        <Menu mode="inline" items={items} />
      </Col>
      <Col
        xl={{ span: 16 }}
        lg={{ span: 16, offset: 1 }}
        md={{ span: 16, offset: 1 }}
      >
        <Outlet />
      </Col>
    </Row>
  );
};

export default AdminLayout;
