/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import { FiEdit2 } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import BASE_URL from "../../Config";
import {
  StudentDivContainer,
  StudentHeaderDivContainer,
  StudentTableDiv,
  PaginationContainer,
} from "../../styles/student.style";
import Modal from "../../components/Modal";
import StudentForm from "../../components/studentComponents/StudentForm";
import EditStudentForm from "../../components/studentComponents/EditStudentForm";
import SpinnerLoader from "../../components/SpinnerLoader";

const Student = () => {
  const [toggleStudent, setToggleStudent] = useState(false);
  const handleStudentForm = () => {
    setToggleStudent(!toggleStudent);
  };
  const [toggleStudentEdit, setToggleStudentEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const handleStudentEditForm = (id) => {
    setToggleStudentEdit(() => !toggleStudentEdit);
    setEditId(() => id);
  };

  const handleStudentEditForm1 = () => {
    setToggleStudentEdit(!toggleStudentEdit);
  };
  //   console.log(editId);
  const [value, setValue] = useState("");
  const [item, setItem] = useState([]);
  const [getschoolLoading, setGetSchoolLoading] = useState(true);
  const [currentPages, setCurrentPages] = useState(0);
  useEffect(() => {
    try {
      const getdep = async () => {
        const d = await BASE_URL.get(`/Students`);
        const response = d.data;
        setItem(response.slice(0, 4));
        if (response) {
          setGetSchoolLoading(false);
        }
      };
      getdep();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
    setTimeout(() => {
      dalayValue(value);
    }, 1000);
  };
  const dalayValue = async (inputValue) => {
    if (value !== "") {
      const studentList = await BASE_URL.get("/Students");
      console.log("suulist", studentList);
      const filterList = studentList.data.filter((item) => {
        return item.firstName
          .toLowerCase()
          .includes(inputValue.toLowerCase() || "");
      });

      setItem(filterList);
    }
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    const d = await BASE_URL.get("/Students");
    const response = d.data;
    if (currentPage) {
      setItem(response.slice(currentPage * 4 - 4, currentPage * 4));
      setCurrentPages(currentPage);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are You Sure") === true) {
      try {
        const DeletStudent = async () => {
          await BASE_URL.delete(`/Students/${id}`);
          const deleteresfresh = await BASE_URL.get(`/Students`);
          // setItem(deleteresfresh.slice(0, 4));
          setItem(
            deleteresfresh.data.slice(currentPages * 4 - 4, currentPages * 4)
          );
        };
        DeletStudent();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <StudentDivContainer>
        <StudentHeaderDivContainer>
          <div>
            <p>Student List</p>
          </div>
          <div>
            <SearchInput
              value={value}
              onChange={handleChange}
              placeholder="search by first name"
            />
          </div>
          <div onClick={handleStudentForm}>
            <Button btnText={"Create Student"} />
          </div>
        </StudentHeaderDivContainer>
        <StudentTableDiv>
          {getschoolLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SpinnerLoader />
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>last Name</th>
                  <th>title</th>
                  <th>phone Number</th>
                  <th>email</th>
                  <th>date Of Birth</th>
                  <th>address</th>
                  <th>department</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {item.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.title}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>{item.dateOfBirth}</td>
                      <td>{item.address}</td>
                      <td>{item.department}</td>
                      <td>
                        <FiEdit2
                          onClick={() => handleStudentEditForm(item.id)}
                        />
                      </td>
                      <td>
                        <AiTwotoneDelete
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </StudentTableDiv>
        <PaginationContainer>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next "
            onPageChange={handlePageClick}
            pageCount={4}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            previousLabel="prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            activeClassName="active"
            previousLinkClassName=""
            nextLinkClassName=""
          />
        </PaginationContainer>
      </StudentDivContainer>
      <Modal toggle={toggleStudent} onClick={handleStudentForm}>
        <StudentForm />
      </Modal>
      {toggleStudentEdit ? (
        <Modal toggle={toggleStudentEdit} onClick={handleStudentEditForm1}>
          <EditStudentForm id={editId} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Student;
