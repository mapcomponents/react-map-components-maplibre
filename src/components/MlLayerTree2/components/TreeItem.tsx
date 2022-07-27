import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useState } from "react";

interface TreeItemProps {
  readonly id: string;
  readonly onSelectCallback: (e: React.MouseEvent<HTMLInputElement>) => void;
  readonly label: string;
  layer: JSX.Element;
  readonly isSelected: boolean | undefined;
  readonly children: Array<JSX.Element>;
}

const TreeItem = ({ onSelectCallback, label, layer, isSelected, children }: TreeItemProps) => {
  const [isOpen, toggleItemOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(isSelected);

  const StyledTreeItem = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  });

  const StyledLabel = styled(Box)({
    height: "24px",
    "&:hover": {
      cursor: "pointer",
    },
  });

  const StyledTreeChildren = styled(Box)({
    paddingLeft: "10px",
  });

  return (
    <div>
      <StyledTreeItem>
        {children && (
          <Box className="icon-container" onClick={() => toggleItemOpen(!isOpen)}>
            {isOpen ? <ExpandMore /> : <ChevronRight />}
          </Box>
        )}
        <StyledLabel
          className="label"
          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
            setSelected(!selected);
            onSelectCallback(e);
          }}
          style={{
            marginLeft: `${!children.length ? "24px" : ""}`,
            background: `${selected ? "#d5d5d5" : ""}`,
          }}
        >
          {label}
        </StyledLabel>
      </StyledTreeItem>
      {layer}
      <StyledTreeChildren sx={{ display: isOpen ? "block" : "none" }}>
        {children}
      </StyledTreeChildren>
    </div>
  );
};

export default TreeItem;
