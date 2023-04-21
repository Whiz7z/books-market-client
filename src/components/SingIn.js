import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createGlobalStyle } from "styled-components";
import { BiCaretRight } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import { login, demoLogin } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Button from "./UI/Button";

const SingInSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SingIn = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const dispatch = useDispatch();

  if (error) {
    console.log("Wrong credentials");
  }

  const demoLoginHandler = (role) => {
    dispatch(demoLogin(role));
  };

  return !userInfo ? (
    <div className="login_form-container">
      <h2 className="form_main-label">Sing In</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SingInSchema}
        onSubmit={(values, actions) => {
          dispatch(login(values));
          actions.resetForm();
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="inputs-container">
            <div className="form-field-label-container gmail-field-label-container">
              <label className="login_form-label label-email">E-mail</label>

              <div className="login_form-field-container">
                <Field name="email" className="login_form-field" />
                {errors.email && touched.email ? (
                  <div className="form-error">{errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="form-field-label-container password-field-label-container">
              <label className="login_form-label label-password">
                Password
              </label>
              <div className="login_form-field-container">
                <Field
                  type="password"
                  name="password"
                  className="login_form-field"
                />
                {errors.password && touched.password ? (
                  <div className="form-error">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="login_form-buttons">
              <Button width="200px" type="submit" className="login_form-btn">
                Sign In
              </Button>
              <Button
                isLink
                width="200px"
                danger
                linkDirection="/registration"
                className="login_btn-switch"
              >
                Switch to Sign Up
              </Button>
            </div>
            <h3 className="login_form-demo-title">Demo Sing In</h3>
            <div className="login_form-buttons-demo">
              <Button
                width="200px"
                className="login_form-btn"
                onClick={() => demoLoginHandler("admin")}
              >
                Login as admin
              </Button>
              <Button
                width="200px"
                className="login_btn-switch"
                onClick={() => demoLoginHandler("user")}
              >
                Login as user
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Navigate to="/products" replace={true} state={{ from: location }} />
  );
};

export default SingIn;
