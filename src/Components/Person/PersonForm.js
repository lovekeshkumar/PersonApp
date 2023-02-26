import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const API_URL = "https://reqres.in/api/users";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date().required("Date of birth is required"),
  avatar: Yup.string()
    .url("Avatar URL must be a valid URL starting with http:// or https://")
    .required("Avatar URL is required"),
  country: Yup.string()
    .min(2, "Country name must be at least 2 characters long")
    .required("Country name is required"),
});

const PersonForm = ({ onPersonAdd }) => {
  const initialValues = {
    name: "",
    email: "",
    dob: "",
    avatar: "",
    country: "",
  };

  const onSubmit = (formData, { setSubmitting, resetForm }) => {
    axios
      .post(API_URL, formData)
      .then((response) => {
        setSubmitting(false);
        const newPerson = { id: response.data.id, ...formData };
        onPersonAdd(newPerson);
        resetForm();
        toast.success("Person added successfully");
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error("Error adding person");
      });
  };

  return (
    <div>
      <h1>Add New Person</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" className="error" />

            <label htmlFor="age">Email:</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label htmlFor="dob">Date of Birth:</label>
            <Field type="date" name="dob" id="dob" />
            <ErrorMessage name="dob" component="div" className="error" />

            <label htmlFor="avatar">Avatar URL:</label>
            <Field type="url" name="avatar" id="avatar" />
            <ErrorMessage name="avatar" component="div" className="error" />

            <label htmlFor="country">Country:</label>
            <Field type="text" name="country" id="country" />
            <ErrorMessage name="country" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default PersonForm;
