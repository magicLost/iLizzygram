import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import PhotoDesc, { getDate } from "./PhotoDesc";
import classes from "./PhotoDesc.module.scss";

describe("Helpers", () => {
  test("getDate", () => {
    //const result = getDate("hello");
    //expect(result.toString()).toEqual("hello");
    expect(() => {
      getDate("hello");
    }).toThrow("Bad date in FinalImageSharp");
    expect(() => {
      getDate();
    }).toThrow("Bad date in FinalImageSharp");
  });
});

/* describe("PhotoDesc", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<PhotoDesc />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

}); */
