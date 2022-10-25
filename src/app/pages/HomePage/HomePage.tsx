import React from "react";
import { withAuth } from "../../auth/withAuth";
import { DefaultLayout } from "../../components/layout";

const HomePage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <h1>Home</h1>
      <h1>Home</h1>
    </DefaultLayout>
  );
};

export default withAuth(HomePage);
