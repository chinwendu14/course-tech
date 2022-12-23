import React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SpinnerLoader from "../components/SpinnerLoader";
import Layout from "../layout/Layout";
const Students = lazy(() => import("../pages/students/Student"));
const School = lazy(() => import("../pages/school/School"));
const Department = lazy(() => import("../pages/departments/Department"));

const RoutConfig = () => {
  return (
    <Suspense fallback={<SpinnerLoader />}>
      <Layout>
        <Routes>
          <Route index path="/" element={<Students />} />
          <Route path="/school" element={<School />} />
          <Route path="/department" element={<Department />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default RoutConfig;
