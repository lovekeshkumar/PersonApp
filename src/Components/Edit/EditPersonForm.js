import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditPersonForm({ selectedPerson, handlePersonUpdate, setSelectedPerson }) {
  const initialValues = {
    name: selectedPerson.first_name + " " + selectedPerson.last_name,
    age: selectedPerson.age,
    dob: selectedPerson.dob,
    country: selectedPerson.country,
    avatar: selectedPerson.avatar,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number().min(1, "Age must be at least 1").required("Age is required"),
    dob: Yup.date().required("Date of Birth is required"),
    country: Yup.string().required("Country is required"),
    avatar: Yup.string().url("Invalid URL").required("Avatar URL is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const updatedPerson = {
      id: selectedPerson.id,
      first_name: values.name.split(" ")[0],
      last_name: values.name.split(" ")[1],
      age: values.age,
      dob: values.dob,
      country: values.country,
      avatar: values.avatar,
    };

    handlePersonUpdate(updatedPerson);
    setSubmitting(false);
  };

  return (
    <div className="edit-person-form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" />
            </div>

            <div className="form-control">
              <label htmlFor="age">Age</label>
              <Field type="number" id="age" name="age" />
              <ErrorMessage name="age" />
            </div>

            <div className="form-control">
              <label htmlFor="dob">Date of Birth</label>
              <Field type="date" id="dob" name="dob" />
              <ErrorMessage name="dob" />
            </div>

            <div className="form-control">
              <label htmlFor="country">Country</label>
              <Field type="text" id="country" name="country" />
              <ErrorMessage name="country" />
            </div>

            <div className="form-control">
              <label htmlFor="avatar">Avatar URL</label>
              <Field type="text" id="avatar" name="avatar" />
              <ErrorMessage name="avatar" />
            </div>

            <button type="submit" disabled={formik.isSubmitting}>
              Save
            </button>
            <button type="button" onClick={() => setSelectedPerson(null)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditPersonForm;
