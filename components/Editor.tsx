import {FC, StrictMode, useRef} from "react";
import {Milkdown, MilkdownProvider, useEditor} from "@milkdown/react";
import { Editor } from "@milkdown/core";
import {usePluginViewFactory, useNodeViewFactory, ProsemirrorAdapterProvider} from '@prosemirror-adapter/react';
import { gfm } from "@milkdown/preset-gfm";
import { commonmark, listItemSchema } from "@milkdown/preset-commonmark";
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
export interface MilkdownProps {
    markdown: string;
    onChange: (newMarkdown: string) => void;
}

export const MilkdownEditor: FC<MilkdownProps> = ({ markdown, onChange }) => {
    const pluginViewFactory = usePluginViewFactory();
    const nodeViewFactory = useNodeViewFactory();
    const editorRef = useRef<Editor | null>(null);


    const { get } = useEditor((root) => {
        const editor = Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, markdown);

                ctx.get(listenerCtx).markdownUpdated((ctx,mark,prevMarkdown) => {

                });

                const customInputRules: InputRule[] = [
                    preventTitleInputRule()
                ];

                ctx.set(inputRulesCtx, customInputRules);

                ctx.set(block.key, [
                    pluginViewFactory({ component: BlockView }),
                ]);

                ctx.update(codeBlockConfig.key, defaultConfig => ({
                    ...defaultConfig,
                    languages,
                    extensions: [basicSetup, oneDark, keymap.of(defaultKeymap)],
                    renderLanguage: (language, selected) => {
                        return html`<span class="leading">${selected ? check : null}</span>${language}`
                    },
                }))

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
                $view(listItemSchema.node,() =>
                    nodeViewFactory({
                        component: InlineCode,
                    }),)

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












































