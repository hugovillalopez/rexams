import {MantineProvider, Tabs, Card} from '@mantine/core';

export default function Preview() {

  return (
    <div id="preview">
      <MantineProvider>
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
      </MantineProvider>
    </div>
  );
}
