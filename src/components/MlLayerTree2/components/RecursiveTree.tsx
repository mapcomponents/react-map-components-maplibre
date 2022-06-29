import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { LayerTreeBranch } from "../types/LayerTreeBranch";
import { LayerTree } from "../types/LayerTree";
import TreeItem from "./TreeItem";

export interface RecursiveTreeProps {
  readonly listMeta: LayerTree | undefined;
  readonly onSelectCallback?: (value: LayerTreeBranch) => void;
}

const RecursiveTree = ({ listMeta, onSelectCallback }: RecursiveTreeProps) => {

  return (
    <Box>
      {listMeta.map((branch: LayerTreeBranch, i: any) => (
        <TreeItem
          id={branch.id}
          key={branch.id}
          onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
            onSelectCallback(branch);
          }}
          isSelected={branch.selected}
          label={branch.label}
          layer={branch.layer}
        >
          <RecursiveTree listMeta={branch.branches} onSelectCallback={onSelectCallback} />
        </TreeItem>
      ))}
    </Box>
  );
};

export default RecursiveTree;
