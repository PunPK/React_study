import Bar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider, Button } from "antd";
import { Card, Row, Col } from "antd";
import axios from "axios";
import UserTable from "../tables/UserTable";

function UserPage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("/api/users/me")
  //     .then((response) => setUser(response.data))
  //     .catch((error) => console.error("Error fetching user data:", error));
  // });

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/me");
      const data = response.data;
      console.log(data);
      setUser(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <body className="App-finance-body">
        <Bar />
        <Spin spinning={isLoading}>
          <Typography.Title>Profile {user.firstname} :</Typography.Title>
          <UserTable data={[user]} />
        </Spin>
      </body>
    </div>
  );
}

export default UserPage;
