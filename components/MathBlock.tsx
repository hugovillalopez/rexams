import { katexOptionsCtx } from "@milkdown/plugin-math";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react";
import katex from "katex";
import {FC, useEffect, useRef, useState } from "react";
import BootstrapToolbar from "./MathToolBar";
import { defaultValueCtx } from "@milkdown/core";
import './Styles/MathBlock.css';
import { FaPencilAlt } from "react-icons/fa";

export const MathBlock: FC = () => {
  const { setAttrs } = useNodeViewContext();
  const mathPanel = useRef<HTMLDivElement>(null);
  const mathPanelDisplay = useRef<HTMLDivElement>(null);
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [loading, getEditor] = useInstance();
  const [modalVisible, setModalVisible] = useState(false);
  const defaultValue = getEditor()?.ctx.get(defaultValueCtx);
  const [formulaSource, setFormulaSource] = useState((defaultValue?.match(/\$\$([\s\S]*?)\$\$/) || [])[1] || "");
  const [originalFormula, setOriginalFormula] = useState(formulaSource);

  // Función para renderizar múltiples fórmulas en el preview
  const renderPreview = (formula: string) => {
    if (mathPanel.current && !loading) {
      try {
        const formulas = formula.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // Limpiar el contenedor de fórmulas
        mathPanel.current.innerHTML = '';

        // Renderizar cada fórmula de forma separada
        formulas.forEach((f) => {
          const formulaElement = document.createElement('div');
          katex.render(f, formulaElement, getEditor().ctx.get(katexOptionsCtx.key));
          mathPanel.current?.appendChild(formulaElement);
        });
      } catch (error) {
        console.error("Error rendering KaTeX:", error);
      }
    }
  };

  // Función similar para el renderizado en el bloque inline-block
  const renderInlineBlock = (formula: string) => {
    if (mathPanelDisplay.current && !loading) {
      try {
        const formulas = formula.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // Limpiar el contenedor
        mathPanelDisplay.current.innerHTML = '';

        // Renderizar cada fórmula como un bloque separado
        formulas.forEach((f) => {
          const formulaElement = document.createElement('div');
          katex.render(f, formulaElement, getEditor().ctx.get(katexOptionsCtx.key));
          mathPanelDisplay.current?.appendChild(formulaElement);
        });
      } catch (error) {
        console.error("Error rendering KaTeX in inline block:", error);
      }
    }
  };

  useEffect(() => {
    renderPreview(formulaSource); // Actualizar vista previa al cambiar la fórmula
    renderInlineBlock(formulaSource); // Actualizar vista inline-block al cambiar la fórmula
  }, [formulaSource, getEditor, loading]);

  useEffect(() => {
    if (modalVisible && formulaSource) {
      renderPreview(formulaSource);
    }
  }, [modalVisible]);

  useEffect(() => {
    setModalVisible(true); // Para abrir el modal automáticamente al crear el componente
  }, []);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newFormula = event.target.value;
    setFormulaSource(newFormula);
    setAttrs({ value: newFormula });
    renderPreview(newFormula);
    renderInlineBlock(newFormula); // Asegúrate de actualizar también el bloque inline
  };

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
    console.log("formula :"+updatedFormula);
    setAttrs({ value: updatedFormula });
    renderPreview(updatedFormula);
    renderInlineBlock(updatedFormula); // Asegúrate de actualizar también el bloque inline
  };

  const handleCancel = () => {
    setFormulaSource(originalFormula);
    setAttrs({ value: originalFormula });
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setOriginalFormula(formulaSource);
    setModalVisible(false);
  };

  return (
      <div style={{ display: "inline" }}>
        <div
            className="block-math"
            tabIndex={-1}
            role="button"
            aria-label="Edit math formula"
            onClick={() => setModalVisible(true)} // Abrir el modal al hacer click
        >
          <div ref={mathPanelDisplay} className="formula-display" />
          <div className="pencil-icon">
            <FaPencilAlt style={{ color: "white" }} />
          </div>
        </div>

        {modalVisible && (
            <>
              <div className="math-modal-overlay" onClick={() => setModalVisible(false)} />
              <div className="math-modal" role="dialog" aria-label="Math formula editor">
                <div className="math-editor-container">
                  <BootstrapToolbar addFormula={addFormula} />
                  <textarea
                      className="math-textarea"
                      ref={codeInput}
                      value={formulaSource}
                      onChange={handleTextareaChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          return; // Permitir salto de línea
                        }
                      }}
                      autoFocus
                      aria-label="Math formula input"
                      placeholder="Enter your LaTeX formula here"
                  />
                  <div className="preview-container">
                    <div className="preview-label">Preview:</div>
                    <div className="preview-content" ref={mathPanel} />
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="button button-cancel" onClick={handleCancel}>Cancelar</button>
                  <button className="button button-confirm" onClick={handleConfirm}>Aceptar</button>
                </div>
              </div>
            </>
        )}
      </div>
  );
};