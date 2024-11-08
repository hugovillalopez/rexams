import {katexOptionsCtx} from "@milkdown/plugin-math";
import {useInstance} from "@milkdown/react";
//import {useNodeViewContext} from "@prosemirror-adapter/react";
import katex from "katex";
import type {FC} from "react";
import {useEffect, useRef, useState} from "react";
import BootstrapToolbar from "./MathToolBar";
import {defaultValueCtx} from "@milkdown/core";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Styles/MathBlock.css';
import { useNodeViewContext } from '@prosemirror-adapter/react';


export const MathBlock: FC = () => {
  const { setAttrs } = useNodeViewContext();
  const mathPanel = useRef<HTMLDivElement>(null);
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("source");
  const [loading, getEditor] = useInstance();
  const defaultValue = getEditor()?.ctx.get(defaultValueCtx);
  const [formulaSource, setFormulaSource] = useState((defaultValue?.match(/\$\$([\s\S]*?)\$\$/) || [])[1] || "");

  const addFormula = (newFormula: string) => {
    if (!codeInput.current) return;
    const textarea = codeInput.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const combinationsToCheck = ['{x}', '{a}', '{\\alpha}', 'x', 'a', '\\alpha'];

    let updatedFormula;
    if (start !== end) {
      const selectedText = formulaSource.substring(start, end);
      updatedFormula = formulaSource.substring(0, start) + newFormula + formulaSource.substring(end);
      for (const combination of combinationsToCheck) {
        if (newFormula.includes(combination)) {
          updatedFormula = updatedFormula.replace(combination, `{${selectedText}}`);
          break;
        }
      }
    } else {
      updatedFormula = formulaSource + newFormula;
    }

    setFormulaSource(updatedFormula);
    setAttrs({ value: updatedFormula });
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!mathPanel.current || value !== "preview" || loading) return;
      try {
        katex.render(formulaSource, mathPanel.current, getEditor().ctx.get(katexOptionsCtx.key));
      } catch (error) {
        console.error("Error rendering KaTeX:", error);
      }
    });
  }, [formulaSource, getEditor, loading, value]);

  useEffect(() => {
    //console.log(`Markdown:\nRexams\n$${formulaSource}$\n$$\n${formulaSource}\n$$`);
  }, [formulaSource]);

  return (
      <div className="math-block pt-3 pb-3">
        <Tabs
            activeKey={value}
            onSelect={(k) => setValue(k ?? "")}
            className="mb-3 justify-content-center"
        >
          <Tab eventKey="preview" title="Preview">
            <div className="text-center" ref={mathPanel} contentEditable={false} />
          </Tab>
          <Tab eventKey="source" title="Source">
            <BootstrapToolbar addFormula={addFormula} />
            <textarea
                className="math-area block h-48 w-full bg-slate-800 font-mono text-gray-50"
                ref={codeInput}
                value={formulaSource}
                onChange={e => {
                  setFormulaSource(e.target.value);
                  setAttrs({ value: e.target.value });
                }}
            />
          </Tab>
        </Tabs>
      </div>

  );
};
