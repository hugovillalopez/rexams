import { katexOptionsCtx } from "@milkdown/plugin-math";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react";
import * as Tabs from "@radix-ui/react-tabs";
import katex from "katex";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import BootstrapToolbar from "./MathToolBar";
import './Styles/InlineMath.css';
import {update} from "lodash";

export const MathInLine: FC = () => {
    const { node, setAttrs } = useNodeViewContext();
    const codePanel = useRef<HTMLDivElement>(null);
    const codePanelInline = useRef<HTMLDivElement>(null);
    const codeInput = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState("source");
    const [loading, getEditor] = useInstance();
    const [modalVisible, setModalVisible] = useState(false);

    // Inicializamos el valor de la fórmula con el contenido del nodo, si está presente
    const [formulaSource, setFormulaSource] = useState(() => {
        const initialValue = node.content.size > 0 ? node.content.child(0).text || "" : "";
        return initialValue.trim();
    });

    // Función para manejar el cambio en el textarea y actualizar directamente el Markdown
    const handleTextareaChange = (UpdateFormula) => {
        /*const e = document.getElementsByTagName("textarea")[0];
        const newValue = e.value;*/
        setFormulaSource(UpdateFormula);  // Actualiza el estado con la nueva fórmula (en LaTeX)
        setAttrs({ value: UpdateFormula }); // Actualiza el valor en el modelo del documento
        //console.log(UpdateFormula);
    };

    // Función para agregar una fórmula al texto actual (en interacción con la barra de herramientas)
    const addFormula = (newFormula: string) => {
        if (!codeInput.current) return;

        const textarea = codeInput.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        let updatedFormula = formulaSource;

        // Si hay texto seleccionado, lo reemplazamos por la nueva fórmula
        if (start !== end) {
            updatedFormula = updatedFormula.substring(0, start) + newFormula + updatedFormula.substring(end);
        } else {
            updatedFormula += newFormula;
        }

        // Actualizamos el estado y el modelo del documento con la nueva fórmula
        /*setFormulaSource(updatedFormula);
        setAttrs({ value: updatedFormula });*/
        handleTextareaChange(updatedFormula);
    };

    // Renderizado de la fórmula KaTeX como vista previa
    useEffect(() => {
        requestAnimationFrame(() => {
            if (codePanel.current && !loading && value === "preview") {
                try {
                    katex.render(formulaSource, codePanel.current, getEditor().ctx.get(katexOptionsCtx.key));
                } catch (error) {
                    console.error("Error al renderizar KaTeX:", error);
                }
            }
            if (codePanelInline.current) {
                try {
                    katex.render(formulaSource, codePanelInline.current, getEditor().ctx.get(katexOptionsCtx.key));
                } catch (error) {
                    console.error("Error al renderizar KaTeX inline:", error);
                }
            }
        });
    }, [formulaSource, getEditor, loading, value, modalVisible]);

    // Sincronizamos el valor de formulaSource con el valor del nodo cuando se carga el componente
    useEffect(() => {
        setFormulaSource(node.content.size > 0 ? node.content.child(0).text || "" : "");
    }, [node]);

    // Manejo del contenido del modal para mostrar la fórmula
    let html = (
        <div className="py-3 text-center inline-math" ref={codePanelInline} onClick={() => setModalVisible(true)} />
    );

    if (modalVisible) {
        html = (
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: "999",
                }}
            >
                <button
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                        fontSize: "60px",
                        padding: "0",
                        userSelect: "none",
                    }}
                    onClick={() =>{
                        setModalVisible(false);
                        /*handleTextareaChange();*/
                    }}
                >
                    &times;
                </button>
                <Tabs.Root contentEditable={false} value={value} onValueChange={(value) => setValue(value)}>
                    <Tabs.List className="border-b border-gray-200 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        <div className="-mb-px flex flex-wrap">
                            <Tabs.Trigger
                                value="preview"
                                className={[
                                    "inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300",
                                    value === "preview" ? "text-nord9" : "",
                                ].join(" ")}
                                onClick={() => setValue("preview")}
                            >
                                Vista previa
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="source"
                                className={[
                                    "inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300",
                                    value === "source" ? "text-nord9" : "",
                                ].join(" ")}
                                onClick={() => setValue("source")}
                            >
                                Fuente
                            </Tabs.Trigger>
                        </div>
                    </Tabs.List>
                    <Tabs.Content value="preview">
                        <div className="text-center py-2" ref={codePanel} />
                    </Tabs.Content>
                    <Tabs.Content value="source">
                        <BootstrapToolbar addFormula={addFormula} />
                        <textarea
                            className="math-area inline h-24 w-full bg-slate-800 font-mono text-gray-50"
                            ref={codeInput}
                            value={formulaSource}
                            onChange={e => {
                                setFormulaSource(e.target.value);
                                setAttrs({ value: e.target.value });
                            }}// Escucha el cambio en el textarea
                        />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        );
    }

    // Devolver el contenido con la vista previa y la fórmula en el formato adecuado
    return html;
};
