import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
import Estimate from "../pages/Estimate/Estimate";

const graphQLClient = new GraphQLClient(
  process.env.REACT_APP_API_URL as string
);
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Bug = lazy(() => import("../pages/Bug/Bug"));
const DailyReport = lazy(() => import("../pages/DailyReport/DailyReport"));
const SprintReport = lazy(() => import("../pages/SprintReport/sprintReport"));
const ResourcePlanning = lazy(
  () => import("../pages/ResourcePlanning/ResourcePlanning")
);

function Routing() {
  const loginData = localStorage.getItem("data");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {loginData && (
          <>
            <Route path="/" element={<Home graphQLClient={graphQLClient} />} />
            <Route
              path="/issue/:id"
              element={<Bug graphQLClient={graphQLClient} />}
            />
            <Route
              path="/dailyreport"
              element={<DailyReport graphQLClient={graphQLClient} />}
            />
            <Route
              path="/estimate"
              element={<Estimate graphQLClient={graphQLClient} />}
            />
            <Route
              path="/sprintReport"
              element={<SprintReport graphQLClient={graphQLClient} />}
            />
            <Route
              path="/resource-planning"
              element={<ResourcePlanning graphQLClient={graphQLClient} />}
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
