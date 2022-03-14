import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Routing from "./routing/Routing";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLClient } from "graphql-request";
import FullScreenLoader from "./components/fullScreenLoader/fullScreenLoader";

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <Suspense fallback={<FullScreenLoader />}>
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  </Suspense>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
