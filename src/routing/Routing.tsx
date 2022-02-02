import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
const graphQLClient = new GraphQLClient(
  process.env.REACT_APP_API_URL as string
);

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Bug = lazy(() => import("../pages/Bug/Bug"));
const DailyReport = lazy(() => import("../pages/DailyReport/DailyReport"));

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/ticket"
          element={<Home graphQLClient={graphQLClient} />}
        />
        <Route
          path="/issue/:id"
          element={<Bug graphQLClient={graphQLClient} />}
        />
        <Route
          path="/dailyreport"
          element={<DailyReport graphQLClient={graphQLClient} />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
