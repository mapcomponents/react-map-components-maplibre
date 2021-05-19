import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

function LeaderboardEntry({
  data,
  onMouseOver,
  onMouseLeave,
  onClick,
  selectedUser,
}) {
  const theme = useTheme();

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "stretch",
        marginTop: "10px",
        cursor: "pointer",
        backgroundColor:
          selectedUser && selectedUser.username === data.username
            ? theme.palette.action.selected
            : "initial",
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <CardMedia
        style={{
          width: "92px",
        }}
        image={
          data.avatar_url ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAAAAAAdJSU2AAACNElEQVR4AdXYBa7jMBCA4b3/JZahzIkjp2qt+BWUWnG5ln2XxaJJb2b5F2ukL4wvzK/rP7bUcbf92u6oftLSe1ldk8efsfaVeEjusZZeC6e1RllaCk/yG6ag1lZ4WwPX69uyD6tAe/g2ipAlNMRS37awDLaFrpcMWxXQOi0jnWCWjFkSZomYJWDWKmatYNZyEWkJsvQimoZYah5NgdaLxagCtF6GRy0DshZPkeYwS/KIJWGWYjwYUzDLxCwDtJ54OKglimBLqHWahii2g1pmHLLGBmwVoRjcKlmgOdw65H5qKuGWCVi5Qlhs6m1sENZi4q3AWNvca5UYy2RjT/SAsiZey6CsIvc0wVlV5lJ0ibPMyLUGCmlxQq0IM0hLdWyro7CWEc3sXsqaK4O2zLxOsmtpfW5Q1u68ZrVmepaaNXEewawtI9X5Xl3U3n1qND6+rfPzvqoIWz/fklNCSLY153YV53J/XUxGCJnKZ1lajsn3/Ffegf6Y5pV2LUsSNL2UHzxUfh3TlYpZqqTpXZm0KZk9zJcqaEmaWPHDw0pxe05K7bWOLHFLWXVetqpYmrjle4+1y0aBaF4UOQ1NU+lYezJClkjLUnSEjqhH6zjAW4OjtY39Ibq+sawUb6W2RQfoqG0VeKuwrRJvlba17faRdbe2pTtYq6Nty/S7yAbGsQjWIq41wVoT1+IdZNy1djUcVdu5lklQWC0xHkt1X31qNEE1Pr3qKv/9XiSNj6Aaifj3/69+AYujsR/MvkpZAAAAAElFTkSuQmCC"
        }
        title="Live from space album cover"
      />
      <div>
        <CardContent>
          <Typography component="h5" variant="h5" style={{ fontSize: "1rem" }}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.distance} Km
          </Typography>
        </CardContent>
        <div></div>
      </div>
    </Card>
  );
}

export default LeaderboardEntry;
