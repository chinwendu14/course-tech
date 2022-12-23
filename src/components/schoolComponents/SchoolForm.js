/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BASE_URL from "../../Config";
import { TextFieldContainer } from "../../styles/studentForm.style";
import TextField from "../TextField";
import Toast from "../Toast";
import Button from "../Button";
const SchoolForm = () => {
  const [succes, setSucce] = useState(false);
  const handleSucess = () => {
    setSucce(!succes);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("school name requried"),
    }),

    onSubmit: (values) => {
      try {
        const PostShools = async () => {
          await BASE_URL.post(`/Schools`, {
            name: formik.values.name,
          }).then((responsedata) => {
            if (!responsedata) {
              setSucce(false);
            } else {
              BASE_URL.get(`/Schools`);
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
      <h2 style={{ color: "black", margin: "20px 0" }}>Create Shool Form</h2>
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

export default SchoolForm;
