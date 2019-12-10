/*
    Configuring Enzyme would require us to pull in an adaptor for the particular version of react that we're using.
    Need to alaso tell jest to call this adapter. 
    Add a new section under the jest config, that is an array.
    And would look like this 
    "jest": {
        "setupFiles": [
        "./tools/testSetup.js"
        ],
        "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|mp3|wav|m4a|aac|oga)$": "<rootDir>/tools/fileMock.js",
        "\\.(css|less)$": "<rootDir>/tools/styleMock.js"
        }
    },

    Jest will run all the files that are mentioned in the setupFiles array
*/

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
