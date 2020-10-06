import React, { useState } from "react";
import Layout from "../component/Layout";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Link } from "gatsby";
import SEO from "../component/SEO";
import IModal from "../component/IModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const LoadableTest = loadable(
  //import(/* webpackPrefetch: true */ '../component/Logo')
  () =>
    pMinDelay(
      import("../component/Test").catch(err =>
        console.log("LOADABLE ERROR", err)
      ),
      300
    ),
  {
    fallback: <CircularProgress />,
  }
);

const OtherPage = () => {
  const [state, setState] = useState({
    showModal: false,
    modalType: "",
  });

  const showTestInModal = () => {
    setState(state => ({ showModal: true, modalType: "test" }));
  };

  const closeModal = () => {
    setState(state => ({ showModal: false, modalType: "" }));
  };

  return (
    <Layout>
      <SEO title="Test" description="Page for test some features" />
      <main>
        <h3>Other page.</h3>
        <Button variant="outlined" onClick={showTestInModal}>
          Show test in modal
        </Button>
        <br />
        <br />
        <Link to="/">Go home</Link>
      </main>
      <IModal open={state.showModal} onClose={closeModal}>
        {state.modalType === "test" && <LoadableTest />}
      </IModal>
    </Layout>
  );
};

export default OtherPage;
