---
sidebar_position: 3
---

# 4. PrintTool

### Add MlCreatePdfButton-Component

1. **Import MlCreatePdfButton-Component:** `import {MlCreatePdfButton} from "@mapcomponents/react-maplibre"` in `src/App.jsx`.

2. **Add MlCreatePdfButton to the Toptoolbar**:

   ```javascript
      <TopToolbar unmovableButtons={
         <>
         <Button id="sidebar" variant="contained" onClick={setShowSidebar(!showSidebar)}}>
            Sidepane
         </Button>
         <Button id="print">
            <MlCreatePdfButton />
         </Button>
         </>
      }
      />
   ```

   There are two components to choose from to create PDF's. The `MlCreatePdfButton` and `MlCreatePdfForm`.
   `MlCreatePdfForm` can be added to the sidepane or a dialog, `MlCreatePdfButton` is developed especially for mobil applications.

   To learn more see [MlCreatePdfButton](/docs/components/Basic_Components/MlCreatePdfButton.md).
