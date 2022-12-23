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
import SchoolForm from "../../components/schoolComponents/SchoolForm";
import EditSchoolForm from "../../components/schoolComponents/EditSchoolForm";
const School = () => {
  const [toggleSchool, setToggleSchool] = useState(false);
  const handleSchoolForm = () => {
    setToggleSchool(!toggleSchool);
  };
  const handleSchoolEditForm1 = () => {
    setToggleSchoolEdit(!toggleSchoolEdit);
  };
  const [toggleSchoolEdit, setToggleSchoolEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const handleSchoolEditForm = (id) => {
    setToggleSchoolEdit(() => !toggleSchoolEdit);
    setEditId(() => id);
  };
  const [value, setValue] = useState("");
  const [item, setItem] = useState([]);
  const [getschoolLoading, setGetSchoolLoading] = useState(true);
  const [currentPages, setCurrentPages] = useState(0);
  useEffect(() => {
    try {
      const GetSchools = async () => {
        const d = await BASE_URL.get(`/Schools`);
        const response = d.data;
        setItem(response.slice(0, 4));
        if (response) {
          setGetSchoolLoading(false);
        }
      };
      GetSchools();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const dalayValue = async (inputValue) => {
    if (value !== "") {
      const schoolList = await BASE_URL.get("/Schools");

      const filterList = schoolList.data.filter((item) => {
        return item.name.toLowerCase().includes(inputValue.toLowerCase() || "");
      });

      setItem(filterList);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
    setTimeout(() => {
      dalayValue(value);
    }, 1000);
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    const d = await BASE_URL.get("/Schools");
    const response = d.data;
    if (currentPage) {
      setItem(response.slice(currentPage * 4 - 4, currentPage * 4));
      setCurrentPages(currentPage);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are You Sure") === true) {
      try {
        const DeletSchool = async () => {
          await BASE_URL.delete(`/Schools/${id}`);
          const deleteresfresh = await BASE_URL.get(`/Schools`);
          // setItem(deleteresfresh.slice(0, 4));
          setItem(
            deleteresfresh.data.slice(currentPages * 4 - 4, currentPages * 4)
          );
        };
        DeletSchool();
      } catch (err) {
        console.log("yyyy", err.message);
      }
    }
    // final({ message: "error" });
  };

  return (
    <>
      <StudentDivContainer>
        <StudentHeaderDivContainer>
          <div>
            <p>School List</p>
          </div>
          <div>
            <SearchInput
              value={value}
              onChange={handleChange}
              placeholder="search by first name"
            />
          </div>
          <div onClick={handleSchoolForm}>
            <Button btnText={"Create School"} />
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
                  <th>School Name</th>

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
                          onClick={() => handleSchoolEditForm(item.id)}
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
      <Modal toggle={toggleSchool} onClick={handleSchoolForm}>
        <SchoolForm />
      </Modal>
      {toggleSchoolEdit ? (
        <Modal toggle={toggleSchoolEdit} onClick={handleSchoolEditForm1}>
          <EditSchoolForm id={editId} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default School;
