---
sidebar_position: 1
---

# 2. Sidebar & TopToolbar

### Add Sidebar-Component

1. **Import Sidebar-Component:** `import {Sidebar} from "@mapcomponents/react-maplibre"` in `src/App.tsx`.

2. **Add Sidebar to the JSX**:
   The Sidebar is assigned a `name` attribute with the value `Sidebar` (string) and an `open` attribute set to true (boolean). In later stages, it will be shown how the sidebar can easily be toggled on and off with a button.

   ```javascript
   <Sidebar open={true} name={"Sidebar"}></Sidebar>
   ```

### Add TopToolbar-Component

1. **Import TopToolbar-Component:** `import {TopToolbar} from "@mapcomponents/react-maplibre"` in `src/App.tsx`.

2. **Add TopToolbar to the JSX**:
   We use Material UI  https://mui.com/material-ui/getting-started/ - a popular React UI framework - in our project.

   ```javascript
   <TopToolbar
     unmovableButtons={
       <>
         <Button
           id="basic-button"
           variant="contained"
           onClick={setShowSidebar(!showSidebar)}
         >
           Button
         </Button>
       </>
     }
   />
   ```

3. **Define a State Variable**: Initiate a `state variable` named `showSidebar` as follows:
   `import { useState } from "react";`

   ```javascript
   const [showSidebar, setShowSidebar] = useState(true);
   ```
