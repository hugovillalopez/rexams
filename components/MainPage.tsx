import {Grid, MantineProvider} from "@mantine/core";
import {PiExamFill} from "react-icons/pi";
import Edicion from "./edicion";
import Preview from "./preview";

import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';

export default function mainPage() {


    return (
      <MantineProvider>

        <Grid grow align="stretch" gutter="xl" style={{ margin: "20px"}}>
          <Grid.Col span={4}>
            <div id="header">
              <div style={{paddingTop:"9px"}}><PiExamFill /></div>
              <h1>REXAMS</h1>

            </div>
          </Grid.Col>
        </Grid>

        <Grid grow gutter="xs" align="stretch" style={{ margin: "10px"}}>

          <Grid.Col span={3} style={{marginRight:"15px"}}><Edicion /></Grid.Col>
          <Grid.Col span={1}><Preview /></Grid.Col>

        </Grid>

      </MantineProvider>
    )

}
