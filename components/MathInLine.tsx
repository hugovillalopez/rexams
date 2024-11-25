import { katexOptionsCtx } from "@milkdown/plugin-math";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react";
import { TextSelection } from "prosemirror-state";
import katex from "katex";
import {FC} from "react";
import { useEffect, useRef, useState } from "react";
import BootstrapToolbar from "./MathToolBar";
import './Styles/InlineMath.css';
import { useOnChange } from "./Editor";
import { FaPencilAlt } from "react-icons/fa";

export const MathInLine: FC = () => {
    const { node, view, getPos } = useNodeViewContext();
    const codePanel = useRef<HTMLDivElement>(null);
    const codePanelInline = useRef<HTMLDivElement>(null);
    const codeInput = useRef<HTMLTextAreaElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const [loading, getEditor] = useInstance();
    const [modalVisible, setModalVisible] = useState(false);
    const onChange = useOnChange();
    const isNewNode = useRef(true);
    const lastKnownFormula = useRef('');

    const stripDelimiters = (formula: string): string => formula.replace(/^\$|\$$/g, '');

    const [formulaSource, setFormulaSource] = useState(() => {
        const initialValue = node.content.size > 0 ? node.content.child(0).text || "" : "";
        const stripped = stripDelimiters(initialValue.trim()); // Aseguramos que no haya espacios
        lastKnownFormula.current = stripped;
        return stripped;
    });

    const [originalFormula, setOriginalFormula] = useState(formulaSource);

    useEffect(() => {
        if (isNewNode.current && !modalVisible && formulaSource === '') {
            isNewNode.current = false;
            setModalVisible(true);
        }
    }, []);

    const updateNodeContent = (newFormula: string) => {
        const { state, dispatch } = view;
        const { tr } = state;
        const pos = typeof getPos === 'function' ? getPos() : null;

        if (pos === null) return;

        const start = pos + 1;
        const end = pos + node.nodeSize - 1;

        // Crear el nuevo nodo de texto sin espacios adicionales
        const textNode = state.schema.text(newFormula);
        tr.replaceRangeWith(start, end, textNode);
        dispatch(tr);
    };

    const setSelectionAfterNode = (pos: number) => {
        const { state, dispatch } = view;
        const { tr } = state;
        const newPos = pos + node.nodeSize;

        // No insertar un espacio adicional
        const nodeAfter = tr.doc.nodeAt(newPos);
        if (!nodeAfter || !/^\s/.test(nodeAfter.text || '')) {
            tr.insertText('', newPos); // Solo mover el cursor sin insertar un espacio
        }

        // Colocar la selección justo después del nodo, sin espacio adicional
        const selection = TextSelection.create(tr.doc, newPos);
        dispatch(tr.setSelection(selection));
    };

    const renderPreview = (formula: string) => {
        if (codePanel.current && !loading) {
            try {
                katex.render(formula, codePanel.current, getEditor().ctx.get(katexOptionsCtx.key));
            } catch (error) {
                console.error("Error rendering KaTeX:", error);
            }
        }
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newFormula = event.target.value;
        setFormulaSource(newFormula);
        renderPreview(newFormula);
    };

    const addFormula = (newFormula: string) => {
        if (!codeInput.current) return;
        const textarea = codeInput.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const updatedFormula = start !== end
            ? formulaSource.substring(0, start) + newFormula + formulaSource.substring(end)
            : formulaSource + newFormula;

        setFormulaSource(updatedFormula);
        renderPreview(updatedFormula);
    };

    useEffect(() => {
        if (node.content.size > 0 && node.content.child(0).text) {
            const content = node.content.child(0).text || "";
            const cleanContent = stripDelimiters(content);

            if (cleanContent !== lastKnownFormula.current) {
                if (content.includes(lastKnownFormula.current)) {
                    return;
                }
                setFormulaSource(cleanContent);
                lastKnownFormula.current = cleanContent;
            }
        }
    }, [node]);

    useEffect(() => {
        const renderFormula = () => {
            if (codePanelInline.current) {
                try {
                    katex.render(formulaSource, codePanelInline.current, getEditor().ctx.get(katexOptionsCtx.key));
                } catch (error) {
                    console.error("Error rendering inline KaTeX:", error);
                }
            }
        };

        renderFormula();
    }, [formulaSource, getEditor, loading]);

    useEffect(() => {
        if (modalVisible && formulaSource) {
            renderPreview(formulaSource);
        }
    }, [modalVisible]);

    const handleCancel = () => {
        setFormulaSource(originalFormula);
        setModalVisible(false);

        setTimeout(() => {
            view.focus();
            const pos = typeof getPos === 'function' ? getPos() : null;
            if (pos !== null) {
                setSelectionAfterNode(pos);
            }
        }, 0);
    };

    const handleConfirm = () => {
        // Limpiar la fórmula de cualquier espacio adicional antes de enviarla
        const sanitizedFormula = formulaSource.trim(); // Asegura que no haya espacios extras
        let formulaWithDelimiters = `$${sanitizedFormula}$`; // Incluye los delimitadores sin espacios extra

        // Aseguramos que haya un espacio después de la fórmula (si no lo hay ya)
        if (!sanitizedFormula.endsWith(' ')) {
            formulaWithDelimiters += ' ';  // Agregar espacio solo si no termina con uno
        }

        lastKnownFormula.current = sanitizedFormula;
        onChange(formulaWithDelimiters);  // Enviar solo la fórmula limpia, con espacio agregado si es necesario
        setOriginalFormula(sanitizedFormula);
        updateNodeContent(sanitizedFormula);  // Actualizar el nodo con la fórmula limpia y el espacio

        setModalVisible(false);

        setTimeout(() => {
            view.focus();
            const pos = typeof getPos === 'function' ? getPos() : null;
            if (pos !== null) {
                setSelectionAfterNode(pos); // Mueve la selección fuera del nodo
            }
        }, 0);
    };

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!modalVisible) {
            setModalVisible(true);
        }
    };

    return (
        <div
            ref={editorRef}
            style={{ display: "inline-flex" }}
            className="math-inline-wrapper"
            contentEditable={false}
            data-formula={lastKnownFormula.current}
        >
            <div
                className="inline-math"
                ref={codePanelInline}
                tabIndex={0}
                role="button"
                aria-label="Edit math formula"
                onClick={handleClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick(e as unknown as React.MouseEvent);
                    }
                }}
            >
                <div className="pencil-icon">
                    <FaPencilAlt style={{ color: "white" }} />
                </div>
            </div>

            {modalVisible && (
                <>
                    <div
                        className="math-modal-overlay"
                        onClick={handleCancel}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                handleCancel();
                            }
                        }}
                        tabIndex={-1}
                    />
                    <div
                        className="math-modal"
                        role="dialog"
                        aria-label="Math formula editor"
                    >
                        <div className="math-editor-container">
                            <BootstrapToolbar addFormula={addFormula} />
                            <textarea
                                className="math-textarea"
                                ref={codeInput}
                                value={formulaSource}
                                onChange={handleTextareaChange}
                                autoFocus
                                aria-label="Math formula input"
                                placeholder="Enter your LaTeX formula here"
                            />
                            <div className="preview-container">
                                <div className="preview-label">Preview:</div>
                                <div className="preview-content" ref={codePanel} />
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="button button-cancel" onClick={handleCancel}>Cancel</button>
                            <button className="button button-confirm" onClick={handleConfirm}>Accept</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};