import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import React, { FC } from 'react';
import { MilkdownProvider } from '@milkdown/react'
import {ProsemirrorAdapterProvider, useNodeViewFactory} from '@prosemirror-adapter/react'
import { StrictMode } from 'react'



import { commonmark, listItemSchema } from '@milkdown/kit/preset/commonmark';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { block } from '@milkdown/kit/plugin/block';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { listenerCtx, listener} from '@milkdown/kit/plugin/listener'
import {math} from "@milkdown/plugin-math";



import { codeBlockConfig, codeBlockComponent } from '@milkdown/kit/component/code-block';


import { BlockView } from './Block';

import {$view} from "@milkdown/utils";
import {languages} from "@codemirror/language-data";
import {basicSetup} from "codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
import { defaultKeymap } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { html } from '@milkdown/kit/component';
import {CodeBlock} from "./CodeBlock";





const content =
  `\`\`\`javascript
  console.log("HOLA");
  \`\`\`
  \* \n `


export const MilkdownEditor: FC = () => {
  const pluginViewFactory = usePluginViewFactory();
  const NodeView = useNodeViewFactory();

  const check = html`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
`

  useEditor((root) => {
    return Editor
      .make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, content)
        ctx.set(block.key, {
          view: pluginViewFactory({
          component: BlockView,
          })
        })



        //Recoge el contenido del markdown y lo muestra
        /*ctx.get(listenerCtx)
          .markdownUpdated((ctx,mark,prevMarkdown) =>{

            useContent();

        })*/

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
      .use(commonmark)
      .use(block)
      .use(codeBlockComponent)
      .use(listener)

      .use([

        $view(listItemSchema.node,() =>
          NodeView({
            component: CodeBlock,
          }),)
      ])


  }, [])
  return (

      <Milkdown />

  );
}

export default function App(){

  return(
    <StrictMode>
      <MilkdownProvider>
          <ProsemirrorAdapterProvider>
            <MilkdownEditor />
          </ProsemirrorAdapterProvider>
      </MilkdownProvider>
    </StrictMode>
  );

}


