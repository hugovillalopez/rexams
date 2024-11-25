import { createRoot } from 'react-dom/client';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './components/Styles/EditorCodeBlockButton.css';
import '@mantine/core/styles.css';
import Edicion from './components/EdicionHTML';
import Preview from './components/Preview';
import {MantineProvider, Grid} from "@mantine/core"; // Asegúrate de que este es el componente correcto

const root$ = document.getElementById('app');
if (!root$) throw new Error('No root element found');

const handleEditorChange = (newMarkdown: string) => {
    console.log("Markdown actualizado:\n", newMarkdown);

    const markdownPreview = document.getElementById("markdown-preview");
    if (markdownPreview) {
        // Establecer el contenido como texto plano
        markdownPreview.textContent = newMarkdown; // Muestra el texto como está, incluyendo '$' para las fórmulas
    }
};

const root = createRoot(root$);

root.render(
    <MantineProvider>

        <Grid grow align="stretch" gutter="xl" style={{ margin: "20px"}}>
            <Grid.Col span={4}>
                <div id="header">
                    <div style={{paddingTop:"9px"}}>{/*<PiExamFill />*/}</div>
                    <h1>REXAMS</h1>

                </div>
            </Grid.Col>
        </Grid>

        <Grid grow gutter="xs" align="stretch" style={{ margin: "10px"}}>

            <Grid.Col span={3} style={{marginRight:"15px"}}><Edicion /></Grid.Col>
            <Grid.Col span={1}><Preview /></Grid.Col>

        </Grid>

    </MantineProvider>
);







