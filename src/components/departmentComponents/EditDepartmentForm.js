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

const EditDepartmentForm = ({ id }) => {
  const [succes, setSucce] = useState(false);
  const [getschoolLoading, setGetSchoolLoading] = useState(true);
  const [DepartmentId, setDepartmentId] = useState({});

  const [schooldata, setSchooldata] = useState([]);

  const handleSucess = () => {
    setSucce(!succes);
  };

  useEffect(() => {
    try {
      const GetDept = async () => {
        const d = await BASE_URL.get(`Departments/${id}`);
        const departmentresponse = d.data;
        if (departmentresponse) {
          setDepartmentId(departmentresponse);
        }
      };
      GetDept();
    } catch (err) {
      console.log(err);
    }
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
  }, [id]);
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: DepartmentId.name,
      schoolName: DepartmentId.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("school name requried"),
      schoolName: Yup.string().required("school name requried"),
    }),

    onSubmit: (values) => {
      try {
        const PostShools = async () => {
          await BASE_URL.put(`/Departments/${id}`, {
            name: formik.values.name,
            school: {
              name: formik.values.schoolName,
            },
          }).then((responsedata) => {
            if (!responsedata) {
              setSucce(false);
            } else {
              console.log("depart", responsedata);

              setTimeout(() => {
                setSucce(true);
              }, 3000);
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

export default EditDepartmentForm;
