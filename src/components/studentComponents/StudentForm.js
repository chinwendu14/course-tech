/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import BASE_URL from "../../Config";
import {
  TextFieldContainerFlex,
  TextFieldContainerWidth,
  TextFieldContainer,
} from "../../styles/studentForm.style";
import Button from "../Button";
import Toast from "../Toast";

const StudentForm = () => {
  const [schooldata, setSchooldata] = useState([]);
  const [getschoolLoading, setGetSchoolLoading] = useState(true);
  const [createstudentLoading, setCreateStudentLoading] = useState(true);

  const [departmentdata, setDepartmentdata] = useState([]);
  const [getdepartmentLoading, setGetdepartmentLoading] = useState(true);
  const [succes, setSucce] = useState(false);
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
    try {
      const getDepartment = async () => {
        const d = await BASE_URL.get(`/Departments`);
        const departmentresponse = d.data;
        setDepartmentdata(departmentresponse);
        setGetdepartmentLoading(false);
      };
      getDepartment();
    } catch (err) {
      console.log("error message from Department" + err);
    }
  }, [getdepartmentLoading]);
  //   console.log("schoollisttt", schooldata[0].name);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      title: "",
      email: "",
      telephone: "",
      dob: "",
      departmentName: "",
      schoolName: "",
      address: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("first name requried"),
      lastname: Yup.string().required("last name requried"),
      title: Yup.string()
        .min(2, "must be more than 3 character")
        .required("user name requried"),
      telephone: Yup.string().required("phone number requried"),
      dob: Yup.string().required("date of birth  requried"),

      departmentName: Yup.string().required("departmentName number requried"),
      address: Yup.string().required("address requried"),
      schoolName: Yup.string().required("school name requried"),

      email: Yup.string().email("invalid email").required(" email required"),
    }),

    onSubmit: (values) => {
      try {
        const PostStudents = async () => {
          await BASE_URL.post(`/Students`, {
            firstName: formik.values.firstname,
            lastName: formik.values.lastname,
            title: formik.values.title,
            phoneNumber: formik.values.telephone,
            email: formik.values.email,
            address: formik.values.address,
            dateOfBirth: formik.values.dob,
            department: {
              name: formik.values.departmentName,
              school: {
                name: formik.values.schoolName,
              },
            },
          }).then((responsedata) => {
            if (!responsedata) {
              setCreateStudentLoading(false);
              setSucce(false);
            } else {
              setCreateStudentLoading(false);
              BASE_URL.get("/Students");
              setTimeout(() => {
                setSucce(true);
              }, 3000);
            }
          });
        };
        PostStudents();
      } catch (err) {
        console.log("error message from Department" + err);
      }
    },
  });
  return (
    <div>
      <h2 style={{ color: "black", margin: "20px 0" }}>Create Student Form</h2>

      <form onSubmit={formik.handleSubmit}>
        <TextFieldContainerFlex>
          <TextFieldContainerWidth>
            <TextField
              value={formik.values.firstname}
              name="firstname"
              id="firstname"
              onChange={formik.handleChange}
              type="text"
              placeholder="First name"
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.firstname}
              </p>
            ) : null}
          </TextFieldContainerWidth>
          <TextFieldContainerWidth>
            <TextField
              onChange={formik.handleChange}
              type="text"
              placeholder="Last name"
              value={formik.values.lastname}
              name="lastname"
              id="lastname"
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.lastname}
              </p>
            ) : null}
          </TextFieldContainerWidth>
        </TextFieldContainerFlex>
        <TextFieldContainerFlex>
          <TextFieldContainerWidth>
            <TextField
              type="text"
              placeholder="Title e.g Mr"
              value={formik.values.title}
              name="title"
              id="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.title}
              </p>
            ) : null}
          </TextFieldContainerWidth>
          <TextFieldContainerWidth>
            <TextField
              value={formik.values.email}
              name="email"
              id="email"
              onChange={formik.handleChange}
              type="email"
              onBlur={formik.handleBlur}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.email}
              </p>
            ) : null}
          </TextFieldContainerWidth>
        </TextFieldContainerFlex>
        <TextFieldContainerFlex>
          <TextFieldContainerWidth>
            <TextField
              type="text"
              placeholder="Phone Number"
              value={formik.values.telephone}
              name="telephone"
              id="telephone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.telephone}
              </p>
            ) : null}
          </TextFieldContainerWidth>
          <TextFieldContainerWidth>
            <TextField
              type="date"
              value={formik.values.dob}
              name="dob"
              id="dob"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.dob && formik.errors.dob ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.dob}
              </p>
            ) : null}
          </TextFieldContainerWidth>
        </TextFieldContainerFlex>
        <TextFieldContainer>
          <TextField
            type="text"
            placeholder="address"
            value={formik.values.address}
            name="address"
            id="address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.address && formik.errors.address ? (
            <p style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.address}
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
            value={formik.values.departmentName}
            name="departmentName"
            id="departmentName"
            onBlur={formik.handleBlur}
          >
            <option value="">
              {getdepartmentLoading ? "loading" : "select department Name"}
            </option>
            {departmentdata.map((item) => {
              return (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {formik.touched.departmentName && formik.errors.departmentName ? (
            <p style={{ color: "red", marginTop: "5px", marginBottom: "0px" }}>
              {formik.errors.departmentName}
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

export default StudentForm;
