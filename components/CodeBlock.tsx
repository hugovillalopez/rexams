import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { html } from '@milkdown/kit/component';

import { codeBlockComponent, codeBlockConfig } from '@milkdown/kit/component/code-block';
import { languages } from '@codemirror/language-data';
import { basicSetup } from 'codemirror';
import { defaultKeymap } from '@codemirror/commands';
import { keymap } from '@codemirror/view';


//import '@milkdown/theme-nord/style.css';

import {Crepe} from "@milkdown/crepe";
import React, {FC, useEffect, useRef, useState} from "react";

import { Button, NativeSelect} from "@mantine/core";
import {listener, listenerCtx} from "@milkdown/plugin-listener";
import {oneDark} from "@codemirror/theme-one-dark";

export const CodeBlock : FC = () =>{
    //const [prueba , SetPrueba] = useState(true)
    const codeRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Editor | null>(null)

    const [lenguage, setLenguage] = useState(false);
    const [echo, setEcho] = useState('');
    const [include, setInclude] = useState('');
    const [results, setResults] = useState('');

    const [texto, setTexto] = useState(`\`\`\``);

    const check = html`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
        </svg>
    `

    //const markdown =


    let listaLanguages = languages;

    //if (lenguage == 'Python' || lenguage == 'R'){
    listaLanguages = listaLanguages.filter((value) => value.name == "Python" || value.name == "R");
    //}

    useEffect(() =>{

        if (codeRef.current){

            if (document.getElementById("code")){
                document.getElementById("code").querySelector(".milkdown").remove()
            }


            const editor = new Crepe({
                root: codeRef.current,
                defaultValue:texto
            }).editor
                .config((ctx) => {
                    ctx.get(listenerCtx).markdownUpdated((ctx,mark,prevMarkdown) => {
                        console.log(mark);
                    });
                    ctx.update(codeBlockConfig.key, defaultConfig => ({
                        ...defaultConfig,
                        expandIcon: () => "▲",
                        searchIcon: () => "",
                        languages: listaLanguages,
                        extensions: [basicSetup, oneDark, keymap.of(defaultKeymap)],
                        renderLanguage: (language, selected) => {
                            if (listaLanguages.length == 1){
                                selected = true;
                                return html`<span class="leading">${selected ? check : null}</span>${language}`
                            }else{
                                return html`<span class="leading">${selected ? check : null}</span>${language}`
                            }

                        },
                    }))
                })
                .use(codeBlockComponent)
                .use(listener)

                .create();

        }
    }, [listaLanguages])



    return (

        <div id={"code"} ref={codeRef} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: "999",
            border: "1px solid black",

        }}>
            <div id="opciones">

                <div contentEditable="false">

                    {/*<div>
                    Lenguage:
                    <NativeSelect id="selectLenguage" size="lg" radius="md" value={lenguage}
                                  onChange={(e) => {
                                      setLenguage(e.currentTarget.value);

                                  }}>
                        <option value="R">R</option>
                        <option value="Python">Python</option>
                        <option value="Otros">Otros</option>
                    </NativeSelect>
                </div>*/}

                    <div>
                        Echo:
                        <NativeSelect size="lg" radius="md" data={[
                            {
                                label:
                                    'Default', value: ''
                            },
                            {label: 'ON', value: 'on'},
                            {label: 'OFF', value: 'off'}
                        ]} value={echo} onChange={(e) => setEcho(e.currentTarget.value)}/>
                    </div>

                    <div>
                        Include:
                        <NativeSelect size="lg" radius="md" data={[
                            {
                                label:
                                    'Default', value: ''
                            },
                            {label: 'ON', value: 'on'},
                            {label: 'OFF', value: 'off'}
                        ]} value={include}
                                      onChange={(e) => setInclude(e.currentTarget.value)}/>
                    </div>

                    <div>
                        Results:
                        <NativeSelect size="lg" radius="md" data={[
                            {label: 'Default', value: ''},
                            {label: 'Hold', value: 'hold'},
                            {label: 'Hide', value: 'hide'},
                            {label: 'Markup', value: 'markup'}
                        ]} value={results}
                                      onChange={(e) => setResults(e.currentTarget.value)}/>
                    </div>

                    <div>
                        <Button variant="outline" color="rgba(0, 0, 0, 1)" size="md"
                                radius="md" onClick={() => document.getElementById("code").style.display = "none"

                        } style={{
                            position: "absolute",
                            top: "0px",
                            right: "10px",
                            cursor: "pointer",
                            border: "none",
                            background: "none",
                            fontSize: "20px",
                            padding: "0",
                            userSelect: "none",


                        }}>X</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

