import {MantineProvider, Tabs, Card} from '@mantine/core';

export default function Preview() {

    const handleEditorChange = (newMarkdown: string) => {
        console.log("Markdown actualizado:\n", newMarkdown);

        const markdownPreview = document.getElementById("markdown-preview");
        if (markdownPreview) {
            // Establecer el contenido como texto plano
            markdownPreview.textContent = newMarkdown; // Muestra el texto como está, incluyendo '$' para las fórmulas
        }
    };

    return (
        <div id="preview">
            {/*<MantineProvider>
                <Card shadow="sm" padding="lg" radius="md" withBorder>

                    <Tabs defaultValue="first">
                        <Tabs.List grow justify="center">
                            <Tabs.Tab value="render" pb="m">Preview</Tabs.Tab>
                            <Tabs.Tab value="md">MD</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="render">
                            hola
                        </Tabs.Panel>

                        <Tabs.Panel value="md">

                        </Tabs.Panel>
                    </Tabs>
                </Card>
            </MantineProvider>*/}
            <div style={{flex: '0 0 35%', padding: '10px', borderLeft: '2px solid #ddd'}}>
                <h3>Markdown</h3>
                {/* Aquí insertamos el contenido de markdown actualizado */}
                <pre id="markdown-preview" style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}} ></pre>
            </div>
        </div>
    );
}
