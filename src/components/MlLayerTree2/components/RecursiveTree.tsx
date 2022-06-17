import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { LayerTreeBranch } from "../types/LayerTreeBranch";
import { LayerTree } from "../types/LayerTree";
import TreeItem from "./TreeItem";

export interface RecursiveTreeProps {
  readonly listMeta: LayerTree;
  readonly onSelectCallback: (value: LayerTreeBranch) => void;
}

const RecursiveTree = ({ listMeta, onSelectCallback }: RecursiveTreeProps) => {
  // const createTree = (branch: LayerTreeBranch) =>
  //   branch.branches && (
  //     <TreeItem
  //       id={branch.id}
  //       key={branch.id}
  //       onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
  //         onSelectCallback(branch);
  //       }}
  //       isSelected={branch.selected}
  //       label={branch.label}
  //     >
  //       {branch.branches.map((branch: LayerTreeBranch) => {
  //         return <Fragment key={branch.id}>{createTree(branch)}</Fragment>;
  //       })}
  //     </TreeItem>
  //   );

  const createTree = (branch: LayerTreeBranch) => {
    if (branch.branches.length > 0) {
      return (
        <TreeItem
          id={branch.id}
          key={branch.id}
          onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
            onSelectCallback(branch);
          }}
          isSelected={branch.selected}
          label={branch.label}
        >
          {branch.branches.map((branch: LayerTreeBranch) => {
            return <Fragment key={branch.id}>{createTree(branch)}</Fragment>;
          })}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem
          id={branch.id}
          key={branch.id}
          onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
            onSelectCallback(branch);
          }}
          isSelected={branch.selected}
          label={branch.label}
          layer={branch.layer && branch.layer}
        >
          {branch.layer}
        </TreeItem>
      );
    }
  };

  return (
    <Box>
      {listMeta.map((branch: LayerTreeBranch, i: any) => (
        <Box key={i}>{createTree(branch)}</Box>
      ))}
    </Box>
  );
};

export default RecursiveTree;
