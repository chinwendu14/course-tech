/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BASE_URL from "../../Config";
import { TextFieldContainer } from "../../styles/studentForm.style";
import TextField from "../TextField";
import Toast from "../Toast";
import Button from "../Button";
const EditSchoolForm = ({ id }) => {
  const [succes, setSucce] = useState(false);
  const handleSucess = () => {
    setSucce(!succes);
  };
  const [getschoolLoading, setGetSchoolLoading] = useState(true);
  //   const [item, setItem] = useState([]);
  const [schooldataId, setSchooldataId] = useState({});

  useEffect(() => {
    try {
      const GetSchool = async () => {
        const d = await BASE_URL.get(`Schools/${id}`);
        const schoolresponse = d.data;

        if (schoolresponse) {
          //   console.log("oneschoolobject", schooldataId);
          setSchooldataId(schoolresponse);
        }
      };
      GetSchool();
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: schooldataId.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("school name requried"),
    }),

    onSubmit: (values) => {
      try {
        const EditShools = async () => {
          await BASE_URL.put(`/Schools/${id}`, {
            name: formik.values.name,
          }).then((responsedata) => {
            console.log("schooledit", responsedata);
            if (!responsedata) {
              setSucce(false);
            } else {
              setTimeout(() => {
                setSucce(true);
              }, 3000);
            }
          });
        };
        EditShools();
      } catch (err) {
        console.log("error message from Department" + err);
      }
    },
  });
  return (
    <div>
      <h2 style={{ color: "black", margin: "20px 0" }}>Edit Shool </h2>
      <form onSubmit={formik.handleSubmit}>
        <TextFieldContainer>
          <TextField
            value={formik.values.name}
            name="name"
            id="name"
            onChange={formik.handleChange}
            type="text"
            placeholder="School name"
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.name}
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

export default EditSchoolForm;
