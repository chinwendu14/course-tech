import styled from "styled-components";

export const StudentDivContainer = styled.div``;

export const StudentHeaderDivContainer = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: calc(95% / 3);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    div {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const StudentTableDiv = styled.div`
  overflow-y: auto;

  background-color: white;
  margin: 30px 0;
  table {
    border-collapse: collapse;
    width: 100%;
    border-spacing: 0 10px;
    th {
      color: red;
      text-align: left;
      padding: 10px;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    td {
      padding: 10px;
      text-align: left;
    }
    tbody {
      width: 100%;
    }
    tbody tr td > p {
      display: flex;
      align-items: center;
      span {
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    list-style: none;
  }
  .page-item {
    background-color: red;
    color: white;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0px 4px rgba(0, 0, 0, 0.5);
    &:hover {
      background-color: #efd5d5;
    }
  }
  // .page-link {
  //   // background-color: #0c0932;
  //   color: white;
  // }
  .active {
    background-color: white;
    color: black;
  }
`;
