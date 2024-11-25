import {createContext, FC, StrictMode, useContext, useRef, useState} from "react";
import {Milkdown, MilkdownProvider, useEditor} from "@milkdown/react";
import { Editor } from "@milkdown/core";
import {usePluginViewFactory, useNodeViewFactory, ProsemirrorAdapterProvider} from '@prosemirror-adapter/react';
import { gfm } from "@milkdown/preset-gfm";
import { commonmark, inlineCodeSchema, codeBlockSchema } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import { math, mathBlockSchema, mathInlineSchema} from "@milkdown/plugin-math";
import { block } from "@milkdown/plugin-block";
import { cursor } from "@milkdown/plugin-cursor";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { defaultValueCtx, rootCtx, inputRulesCtx } from '@milkdown/core'; // Importa correctamente inputRules
//import throttle from "lodash/throttle";
import { MathBlock } from "./MathBlock";
import { BlockView } from "./Block";
import { MathInLine } from "./MathInLine";
import { InlineCode } from "./InlineCode";
import { $view } from "@milkdown/utils";
import { InputRule } from "prosemirror-inputrules";
//CodeBlock Config -------------------------------------
import { codeBlockConfig, codeBlockComponent } from '@milkdown/kit/component/code-block';
import {languages} from "@codemirror/language-data";
import {basicSetup} from "codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
import { defaultKeymap } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { html } from '@milkdown/kit/component';
import {CodeBlock} from "./CodeBlock";
import {
    getChildrenNodesValues
} from "@mantine/core/lib/components/Tree/get-children-nodes-values/get-children-nodes-values";
import throttle from "lodash/throttle";

const check = html`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
`

const preventTitleInputRule = () => new InputRule(
    /^#\s+(.*)$/, // Detecta el patrón "#"
    (state, match, start, end) => {
        const text = match[1] || ""; // Si no hay texto, asignar una cadena vacía

        // Aquí simplemente reemplazamos el '#' con el texto como un nodo normal
        const tr = state.tr.replaceWith(start, end, state.schema.text(`# ${text}`)); // Mantén el #, pero trata el resto como texto normal
        return tr;
    }
);

export const OnChangeContext = createContext<(formula: string) => void>(() => {});

export const useOnChange = () => useContext(OnChangeContext);

export interface MilkdownProps {
    markdown: string;
    onChange: (newMarkdown: string) => void;
}

export const MilkdownEditor: FC<MilkdownProps> = ({ markdown, onChange }) => {
    const pluginViewFactory = usePluginViewFactory();
    const nodeViewFactory = useNodeViewFactory();
    const editorRef = useRef<Editor | null >(null);
    const [elemento, setElemento] = useState(null)



    const { get } = useEditor((root) => {
        const editor = Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, markdown);

                ctx.get(listenerCtx).markdownUpdated(throttle((ctx, updatedMarkdown, prevMarkdown) => {
                        console.log("Markdown actualizado 2:", updatedMarkdown);  // Agregar verificación del valor
                        onChange(updatedMarkdown);
                    if (document.getElementById("code")){
                        let code = document.getElementById("code").querySelectorAll(".milkdown")
                        if (code.length > 1){
                            code.item(1).remove()
                        }
                    }
                        const f2 = prevMarkdown.replace(/\s+/g,'');
                        const f = updatedMarkdown.replace(/\s+/g,'');
                        if(f.substring(f.length - 4) == "$$$$") {
                            if (f2.substring(f.length - 4) != "$$$$" && f.substring(f.length - 4) == "$$$$") {
                                const p = document.createElement("p");
                                p.appendChild(document.createElement("br"));
                                document.getElementsByClassName("editor")[0].appendChild(p); // Usa el editorRoot directamente, ya es un Node.
                            }
                        }
                    }, 200)
                );


                const customInputRules: InputRule[] = [
                    preventTitleInputRule()
                ];

                ctx.set(inputRulesCtx, customInputRules);

                ctx.set(block.key, [
                    pluginViewFactory({ component: BlockView }),
                ]);


            })
            .config(nord)
            .use(gfm)
            .use(commonmark)
            .use(codeBlockComponent)
            .use([
                $view(mathBlockSchema.node, () =>
                    nodeViewFactory({
                        component: MathBlock,
                        stopEvent: () => true,
                    })
                ),
                math,
                $view(mathInlineSchema.node, () =>
                    nodeViewFactory({
                        component: MathInLine,
                        stopEvent: () => true,
                    })
                ),
                math,
                $view(inlineCodeSchema.mark,() =>
                    nodeViewFactory({
                        component: InlineCode,
                    }),),
                $view(codeBlockSchema.node,() =>
                    nodeViewFactory({
                        component: CodeBlock,
                    })
                )

            ].flat())
            .use(block)
            .use(cursor)
            .use(listener);

        editorRef.current = editor;
        return editor;
    }, [markdown, onChange]);

    return (
        <div className="relative h-full">
            <div className="h-full overflow-auto overscroll-none pt-10">
                <Milkdown />
            </div>
        </div>
    );
};












































