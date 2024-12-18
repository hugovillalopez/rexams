import {App, MilkdownEditor} from "./Editor";
import {Accordion, MantineProvider, Card, NativeSelect, Input, NumberInput, Grid, Button} from '@mantine/core';
//import { HiPencilSquare } from "react-icons/hi2";
import {StrictMode, useState} from "react";
import {MilkdownProvider} from "@milkdown/react";
import {ProsemirrorAdapterProvider} from "@prosemirror-adapter/react";
//import Preview from "./preview";
//import SplitPane from "react-split-pane";


export default function Edicion(){
    const [enun, setEnun] = useState(false);
    const [solu, setSolu] = useState(false);
    const handleEditorChange = (newMarkdown: string) => {
        console.log("Markdown actualizado:\n", newMarkdown);

        const markdownPreview = document.getElementById("markdown-preview");
        if (markdownPreview) {
            // Establecer el contenido como texto plano
            markdownPreview.textContent = newMarkdown; // Muestra el texto como está, incluyendo '$' para las fórmulas
        }
    };

    return (
        <div id="edicion">
            <MantineProvider>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div className="titulo">
                        <div style={{paddingTop: "6px"}}>{/*<HiPencilSquare/>*/}</div>
                        <h2>
                            Edición
                        </h2>
                    </div>

                    <Accordion variant="separated" radius="md">

                        <Accordion.Item key="conf" value="conf">
                            <Accordion.Control>CONF. PREGUNTA</Accordion.Control>
                            <Accordion.Panel>

                                <p>Nombre la Pregunta</p>
                                <Input variant="filled" size="md" radius="md" placeholder="..."/>
                                <Grid grow gutter="xs" align="stretch" style={{margin: "10px"}}>

                                    <Grid.Col span={1}>
                                        <p>Tipo de Pregunta </p>
                                        <NativeSelect variant="filled" size="md" radius="md" data={[
                                            {label: 'String', value: 'string'},
                                            {label: 'Numeric', value: 'numeric'},
                                            {label: 'Multiple Choice', value: 'multipleChoice'},
                                            {label: 'Single Choice', value: 'singleChoice'}]}/>
                                    </Grid.Col>

                                    <Grid.Col span={1}>
                                        <p>Puntuacion</p>
                                        <p><NumberInput variant="filled" size="md" radius="md" decimalScale={2} fixedDecimalScale
                                                        defaultValue={2.2}/></p>
                                    </Grid.Col>
                                </Grid>

                            </Accordion.Panel>
                        </Accordion.Item>

                        {/*<Accordion.Item key="enun" value="enun">
                <Accordion.Control >ENUNCIADO</Accordion.Control>
                <Accordion.Panel><App /></Accordion.Panel>
              </Accordion.Item>*/}

                        {/*<Accordion.Item key="solu" value="solu">
                <Accordion.Control >SOLUCION</Accordion.Control>
                <Accordion.Panel><App /></Accordion.Panel>
              </Accordion.Item>*/}

                    </Accordion>
                    <Button variant="outline" color="rgba(0, 0, 0, 1)" size="md" radius="md" onClick={() => {
                        if (enun) setEnun(false); else setEnun(true)}}
                    >
                        Introducir Enunciado
                    </Button>

                    <Button variant="outline" color="rgba(0, 0, 0, 1)" size="md" radius="md" onClick={(e) => {
                        if (solu) setSolu(false); else setSolu(true)}}
                    >
                        Introducir Solucion
                    </Button>

                    { enun &&
                        <div id="enun">
                            <StrictMode>
                                <MilkdownProvider>
                                    <ProsemirrorAdapterProvider>
                                        <MilkdownEditor markdown={"R/Exams"} onChange={handleEditorChange} />
                                    </ProsemirrorAdapterProvider>
                                </MilkdownProvider>
                            </StrictMode>
                        </div>
                    }

                    {solu &&
                        <div id="solu">
                            <StrictMode>
                                <MilkdownProvider>
                                    <ProsemirrorAdapterProvider>
                                        <MilkdownEditor markdown={"R/Exams"} onChange={handleEditorChange} />
                                    </ProsemirrorAdapterProvider>
                                </MilkdownProvider>
                            </StrictMode>
                        </div>
                    }


                </Card>
            </MantineProvider>

        </div>
    )

}
