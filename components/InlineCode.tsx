import {FC, useState} from "react";
import { NativeSelect, Button } from '@mantine/core';


export const InlineCode:FC = () => {

    const [lenguage, setLenguage] = useState('');
    const [echo, setEcho] = useState('');
    const [include, setInclude] = useState('');
    const [results, setResults] = useState('');
    const [opcion, setOpcion] = useState(false);

    let html = <Button variant="outline" color="rgba(0, 0, 0, 1)" size="md" radius="md" onClick={() => {setOpcion(true)}}>MAS OPCIONES</Button>;

    if (opcion) {
        html = <div id="opciones"
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
                        border: "1px solid black",
                    }}>

            <div contentEditable="false">

                <div>
                    Lenguage:
                    <NativeSelect size="lg" radius="md" data={[
                        {label: 'R', value: 'r'},
                        {label: 'Python', value: 'python'}
                    ]} value={lenguage} onChange={(e) => setLenguage(e.currentTarget.value)}/>
                </div>

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
                    ]} value={include} onChange={(e) => setInclude(e.currentTarget.value)}/>
                </div>

                <div>
                    Results:
                    <NativeSelect size="lg" radius="md" data={[
                        {label: 'Default', value: ''},
                        {label: 'Hold', value: 'hold'},
                        {label: 'Hide', value: 'hide'},
                        {label: 'Markup', value: 'markup'}
                    ]} value={results} onChange={(e) => setResults(e.currentTarget.value)}/>
                </div>

                <div>
                    <Button variant="outline" color="rgba(0, 0, 0, 1)" size="md" radius="md" onClick={() => {
                        setOpcion(false)
                    }}style={{
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

    }
    return html;
}