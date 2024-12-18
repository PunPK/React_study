import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

function Navbar() {
  return (
    <div className="navigation-menu">
      <ul>
        <li>
          <Link to="/">
            <HomeOutlined className="menu-icon" />
            <span className="menu-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/Editdata">
            <DollarOutlined className="menu-icon" />
            <span className="menu-text">Add/Edit/Delete</span>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <UserOutlined className="menu-icon" />
            <span className="menu-text">User</span>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <UserDeleteOutlined className="menu-icon" />
            <span className="menu-text">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
