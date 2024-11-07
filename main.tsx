
import { createRoot } from 'react-dom/client'

import './style.css'
import '@mantine/core/styles.css'
import 'split-pane-react/esm/themes/default.css'
import '@milkdown/theme-nord/style.css';


import MainPage from "./components/MainPage";


//if (!root$ || !root$2)
//  throw new Error('No root element found')

//DIV EDICION
  // @ts-ignore
createRoot(document.getElementById("app")).render(
  <MainPage></MainPage>
)
