
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import SearchPhotoForm from ".";
import classes from './SearchPhotoForm.module.scss';


describe("SearchPhotoForm", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<SearchPhotoForm />);
        
        });

        afterEach(cleanup)
    
        describe("Snapshots", () => {
          test("matches snapshot", () => {
            const { baseElement } = _render;
            expect(baseElement).toMatchSnapshot();
          });
        });
    
    });

});

        