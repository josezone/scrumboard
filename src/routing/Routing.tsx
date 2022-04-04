import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
import Estimate from "../pages/Estimate/Estimate";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const graphQLClient = new GraphQLClient(
  process.env.REACT_APP_API_URL as string
);
const Home = lazy(() => import("../pages/Home/Home"));
const Home2 = lazy(() => import("../pages/Home2/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Bug = lazy(() => import("../pages/Bug/Bug"));

const ResourcePlanning = lazy(
  () => import("../pages/ResourcePlanning/ResourcePlanning")
);
const TotalSP = lazy(() => import("../pages/TotalSP/TotalSP"));
const Report = lazy(() => import("../pages/Report/Report"));

function Routing() {
  const loginData = localStorage.getItem("data");
  return (
    <BrowserRouter>
    <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        {loginData && (
          <>
            <Route path="2" element={<Home graphQLClient={graphQLClient} />} />
            <Route path="/" element={<Home2 graphQLClient={graphQLClient} />} />
            <Route
              path="/issue/:id"
              element={<Bug graphQLClient={graphQLClient} />}
            />
            <Route
              path="/estimate"
              element={<Estimate graphQLClient={graphQLClient} />}
            />
            <Route
              path="/resource-planning"
              element={<ResourcePlanning graphQLClient={graphQLClient} />}
            />
            <Route
              path="/totalSP"
              element={<TotalSP graphQLClient={graphQLClient} />}
            />
            <Route
              path="/report"
              element={<Report graphQLClient={graphQLClient} />}
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
