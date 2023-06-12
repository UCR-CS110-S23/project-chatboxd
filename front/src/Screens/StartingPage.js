import { useState } from "react";
import { Button } from "@mui/material";
import '../Styles/StartingPage.css'

function StartingPage(props) {
  const [username, setUsername] = useState("");
  return (
    <div className="starting-page">
      {props.rooms.map((item) => (
        <Button
          key={item}
          className="room-button"
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default StartingPage;