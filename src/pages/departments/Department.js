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

import SpinnerLoader from "../../components/SpinnerLoader";

import DepartmentForm from "../../components/departmentComponents/DepartmentForm";
import EditDepartmentForm from "../../components/departmentComponents/EditDepartmentForm";
const Department = () => {
  const [toggleDepartment, setToggleDepartment] = useState(false);
  const handleDepartmentForm = () => {
    setToggleDepartment(!toggleDepartment);
  };
  const handleDepartmentEditForm1 = () => {
    setToggleDepartmentEdit(!toggleDepartmentEdit);
  };
  const [toggleDepartmentEdit, setToggleDepartmentEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const handleDepartmentEditForm = (id) => {
    setToggleDepartmentEdit(() => !toggleDepartmentEdit);
    setEditId(() => id);
  };
  const [value, setValue] = useState("");
  const [item, setItem] = useState([]);
  const [getDepartmentLoading, setGetDepartmentLoading] = useState(true);
  const [currentPages, setCurrentPages] = useState(0);
  useEffect(() => {
    try {
      const GetDepartments = async () => {
        const d = await BASE_URL.get(`/Departments`);
        const response = d.data;
        setItem(response.slice(0, 4));
        if (response) {
          setGetDepartmentLoading(false);
        }
      };
      GetDepartments();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const dalayValue = async (inputValue) => {
    if (value !== "") {
      const departmentList = await BASE_URL.get("/Departments");

      const filterList = departmentList.data.filter((item) => {
        return item.name.toLowerCase().includes(inputValue.toLowerCase() || "");
      });

      setItem(filterList);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    setTimeout(() => {
      dalayValue(value);
    }, 1000);
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    const d = await BASE_URL.get("/Departments");
    const response = d.data;
    if (currentPage) {
      setItem(response.slice(currentPage * 4 - 4, currentPage * 4));
      setCurrentPages(currentPage);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are You Sure") === true) {
      try {
        const DeletDepartment = async () => {
          await BASE_URL.delete(`/Departments/${id}`);
          const deleteresfresh = await BASE_URL.get(`/Departments`);

          if (deleteresfresh) {
            setItem(
              deleteresfresh.data.slice(currentPages * 4 - 4, currentPages * 4)
            );
          }
        };
        DeletDepartment();
      } catch (err) {
        console.log("yyyy", err.message);
      }
    }
  };
  return (
    <>
      <StudentDivContainer>
        <StudentHeaderDivContainer>
          <div>
            <p>Department List</p>
          </div>
          <div>
            <SearchInput
              value={value}
              onChange={handleChange}
              placeholder="search by first name"
            />
          </div>
          <div onClick={handleDepartmentForm}>
            <Button btnText={"Create Department"} />
          </div>
        </StudentHeaderDivContainer>
        <StudentTableDiv>
          {getDepartmentLoading ? (
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
                  <th>Department Name</th>

                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {item.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>

                      <td>
                        <FiEdit2
                          onClick={() => handleDepartmentEditForm(item.id)}
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
            pageCount={5}
            marginPagesDisplayed={3}
            // pageRangeDisplayed={3}
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
      <Modal toggle={toggleDepartment} onClick={handleDepartmentForm}>
        <DepartmentForm />
      </Modal>
      {toggleDepartmentEdit ? (
        <Modal
          toggle={toggleDepartmentEdit}
          onClick={handleDepartmentEditForm1}
        >
          <EditDepartmentForm id={editId} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Department;
