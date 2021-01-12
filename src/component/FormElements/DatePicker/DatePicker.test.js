import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import DatePicker from "./DatePicker";
import classes from "./DatePicker.module.scss";
import isDate from "validator/lib/isDate";

describe("DatePicker", () => {
  //let _render = null;

  describe("Date validator", () => {
    test("", () => {});
  });

  /* describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<DatePicker />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    }); */
});
