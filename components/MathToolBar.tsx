import React,{useEffect} from 'react';
import "./Styles/BootStrapToolBar.css";
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { math_categories, math_eq_icons, latex_sym } from "../assets/latex";
import 'katex/dist/katex.min.css';
import {InlineMath} from "react-katex";

// Define the properties that the component expects to receive
const MathToolBar: React.FC<{addFormula: (data: any) => void}> = ({addFormula}) => {

  useEffect(() => {

  }, []);

  //Click Handler for pass selected formula to parent component
  const handleButtonClick = (formula: string) => {

    addFormula(formula);

  };

  let tabs = [];

  //for iterate in math_eq_titles data
  math_categories.forEach(function (elem, i) {
    let tab_icon = <div className="latex-button">
      <InlineMath math={math_eq_icons[i]}/>
      <span>{elem}</span>
    </div>;

    tabs.push(
        <Tab className="latex-tab mb-0 border-bottom justify-content-center" key={i} eventKey={elem} title={tab_icon}>

          {latex_sym[i].map(function (elem2, j) {

            //Button generation from data --> pass formula selected on click into handler
            return <Button className="me-1 ms-1 mt-2 mb-2" variant="light" key={j} onClick={() => handleButtonClick(elem2)}><InlineMath math={elem2}/></Button>;
          })}
        </Tab>
    );
  });

  //return tabs
  return (
      <Tabs
          defaultActiveKey={math_categories[0]}
          id="uncontrolled-tab-example"
          className="mb-0 mt-0 justify-content-center">
        {tabs}
      </Tabs>
  );
};

export default MathToolBar;
