import { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginScreen.css";
// import dayjs from "dayjs";
import { DingdingOutlined } from "@ant-design/icons";
import Signup from "./Signup";

const URL_AUTH = "/api/auth/local";
// const URL_TXACTIONS = "/api/txactions";

export default function LoginScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [signupData, setSignupData] = useState([]);
  const [rememberme, setRememberme] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);

      const response = await axios.post(URL_AUTH, { ...formData });
      const token = response.data.jwt;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      if (rememberme) {
        localStorage.setItem("username", formData.identifier);
        localStorage.setItem("password", formData.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      props.onLoginSuccess();
    } catch (err) {
      console.log(err);
      setErrMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    <Signup />;
    // navigate("/signup");
  };
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    // console.log("Saved Username:", savedUsername);
    // console.log("Saved Password:", savedPassword);

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberme(true);
    }
  }, []);

  return (
    <div className="login-container">
      <DingdingOutlined className="custom-icon" />
      <h1>Login</h1>
      <Form
        onFinish={(formData) => handleLogin({ ...formData })}
        autoComplete="off"
        initialValues={{
          identifier: username,
          password: password,
        }}
      >
        {errMsg && (
          <Form.Item>
            <Alert message={errMsg} type="error" />
          </Form.Item>
        )}

        <Form.Item
          label="Username"
          name="identifier"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <input
            type="checkbox"
            checked={rememberme}
            onChange={(e) => setRememberme(e.target.checked)}
          />
          <span style={{ marginLeft: 8 }}>Remember Me</span>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <Button type="primary" onClick={handleSignup} loading={isLoading}>
          Don't have an account? Sign Up
        </Button>
      </div>
    </div>
  );
}
