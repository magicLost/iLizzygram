import React, { useState, useRef } from "react";
import { alertVar } from "../../apolloClient/cache";

const TestHelper = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("Change state from test helper");
          alertVar({ isShow: true, type: "error", message: "Bad error." });
        }}
      >
        Change state
      </button>
    </div>
  );
};

export default TestHelper;
