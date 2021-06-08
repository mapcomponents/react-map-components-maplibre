import React from "react";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { useTheme } from "@material-ui/core/styles";

function LeaderboardEntry({
  data,
  onMouseOver,
  onMouseLeave,
  onClick,
  selectedUser,
  position,
}) {
  const theme = useTheme();

  return (
    <>
      <ListItem
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{
          padding: 0,
          display: "flex",
          flexDirection: "row",
          borderRadius: "5px",
          alignContent: "stretch",
          alignItems: "stretch",
          marginTop: "0px",
          cursor: "pointer",
          backgroundColor:
            selectedUser && selectedUser.username === data.username
              ? theme.palette.action.selected
              : "initial",
        }}
      >
        <ListItemAvatar
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            marginLeft: "8px",
          }}
        >
          <Avatar>
            <img
              style={{
                maxWidth: "100%",
              }}
              src={
                data.avatar_url ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAAAAAAdJSU2AAACNElEQVR4AdXYBa7jMBCA4b3/JZahzIkjp2qt+BWUWnG5ln2XxaJJb2b5F2ukL4wvzK/rP7bUcbf92u6oftLSe1ldk8efsfaVeEjusZZeC6e1RllaCk/yG6ag1lZ4WwPX69uyD6tAe/g2ipAlNMRS37awDLaFrpcMWxXQOi0jnWCWjFkSZomYJWDWKmatYNZyEWkJsvQimoZYah5NgdaLxagCtF6GRy0DshZPkeYwS/KIJWGWYjwYUzDLxCwDtJ54OKglimBLqHWahii2g1pmHLLGBmwVoRjcKlmgOdw65H5qKuGWCVi5Qlhs6m1sENZi4q3AWNvca5UYy2RjT/SAsiZey6CsIvc0wVlV5lJ0ibPMyLUGCmlxQq0IM0hLdWyro7CWEc3sXsqaK4O2zLxOsmtpfW5Q1u68ZrVmepaaNXEewawtI9X5Xl3U3n1qND6+rfPzvqoIWz/fklNCSLY153YV53J/XUxGCJnKZ1lajsn3/Ffegf6Y5pV2LUsSNL2UHzxUfh3TlYpZqqTpXZm0KZk9zJcqaEmaWPHDw0pxe05K7bWOLHFLWXVetqpYmrjle4+1y0aBaF4UOQ1NU+lYezJClkjLUnSEjqhH6zjAW4OjtY39Ibq+sawUb6W2RQfoqG0VeKuwrRJvlba17faRdbe2pTtYq6Nty/S7yAbGsQjWIq41wVoT1+IdZNy1djUcVdu5lklQWC0xHkt1X31qNEE1Pr3qKv/9XiSNj6Aaifj3/69+AYujsR/MvkpZAAAAAElFTkSuQmCC"
              }
              alt=""
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ style: theme.classes.participantName }}
          secondaryTypographyProps={{
            style: theme.classes.participantPerformance,
          }}
          primary={position + ". " + data.name}
          secondary={String(data.distance).replace(".", ",") + " km"}
        />
      </ListItem>
    </>
  );
}

export default LeaderboardEntry;
