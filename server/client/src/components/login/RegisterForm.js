import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";

import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
} from "antd";

import {
  fetchCurrentUser,
  isLoggedInUpdated,
  selectCurrentUserStatus,
} from "../../features/users/usersSlice";
import apiAxios from "../../config/axiosConfig";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm = (props) => {
  const [form] = Form.useForm();

  const history = useHistory();
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState("");
  const [SignupMsg, setSignupMsg] = useState("");
  const [isLoginDone, setIsLoginDone] = useState(false);
  const userStatus = useSelector(selectCurrentUserStatus);

  const onFinish = async (data) => {
    try {
      const signupResponse = await apiAxios.post("/auth/signup", {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        address1: data.address1,
        address2: data.address2,
        postcode: data.postcode,
        city: data.city,
        country: data.country,
      });
      if (signupResponse.status === 201) {
        setSignupMsg("User Sign-up successful!");
        // Redirect to submitsucess
        console.log("ok");
        // props.onSubmit();
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setErrorMsg(err.response.data);
      } else if (err.request) {
        console.log(err.request.data);
      } else {
        console.log("An error occured creating account and/or logging in.");
      }
    }
  };
  
  return (
      <div>
    <Form 
    {...formItemLayout}
    form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="Firstname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your firstname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Lastname"
        rules={[
          {
            required: true,
            message: "Please input your lastname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address1"
        label="Address Line 1"
        rules={[
          {
            required: true,
            message: "Please input your address!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="address2" label="Address Line 2">
        <Input />
      </Form.Item>

      <Form.Item
        name="postcode"
        label="Postcode"
        rules={[
          {
            required: true,
            message: "Max length is 6",
            max: 6,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            required: true,
            message: "Please input your city",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="country" label="Country">
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default RegisterForm;