import React from "react";
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BASE_URL from "../../Config";
import { TextFieldContainer } from "../../styles/studentForm.style";
import TextField from "../TextField";
import Toast from "../Toast";
import Button from "../Button";
const DepartmentForm = () => {
  const [succes, setSucce] = useState(false);
  const [getschoolLoading, setGetSchoolLoading] = useState(true);
  const [schooldata, setSchooldata] = useState([]);

  const handleSucess = () => {
    setSucce(!succes);
  };

  useEffect(() => {
    try {
      const getschool = async () => {
        const datares = await BASE_URL.get(`/Schools`);
        const schoolresponse = datares.data;
        setSchooldata(schoolresponse);
        setGetSchoolLoading(false);
      };
      getschool();
    } catch (err) {
      console.log("error message from school" + err);

      setGetSchoolLoading(false);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      schoolName: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("school name requried"),
      schoolName: Yup.string().required("school name requried"),
    }),

    onSubmit: (values) => {
      console.log("form", formik.values);

      try {
        const PostShools = async () => {
          await BASE_URL.post(`/Departments`, {
            name: formik.values.name,
            school: {
              name: formik.values.schoolName,
            },
          }).then((responsedata) => {
            if (!responsedata) {
              setSucce(false);
            } else {
              BASE_URL.get(`/Departments`);

              const timeOut = setTimeout(() => {
                setSucce(true);
              }, 1000);
              return () => clearTimeout(timeOut);
            }
          });
        };
        PostShools();
      } catch (err) {
        console.log("error message from Department" + err);
      }
    },
  });
  return (
    <div>
      <h2 style={{ color: "black", margin: "20px 0" }}>
        Create Department Form
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <TextFieldContainer>
          <TextField
            value={formik.values.name}
            name="name"
            id="name"
            onChange={formik.handleChange}
            type="text"
            placeholder="Department name"
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.name}
            </p>
          ) : null}
        </TextFieldContainer>
        <TextFieldContainer>
          <select
            style={{
              width: "100%",
              padding: "10px",
              outline: "none",
              border: "2px solid black",
              borderRadius: "8px",
            }}
            type="text"
            onChange={formik.handleChange}
            value={formik.values.schoolName}
            name="schoolName"
            id="schoolName"
            onBlur={formik.handleBlur}
          >
            <option value="">
              {getschoolLoading ? "loading" : "select school Name"}
            </option>
            {schooldata?.map((item) => {
              return (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {formik.touched.schoolName && formik.errors.schoolName ? (
            <p style={{ color: "red", marginTop: "5px", marginBottom: "0px" }}>
              {formik.errors.schoolName}
            </p>
          ) : null}
        </TextFieldContainer>
        <Toast onClick={handleSucess} toggle={succes} text="Sucessfull" />
        <div style={{ marginTop: "10px" }}>
          <Button btntype="submit" btnText={"send"} />
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
