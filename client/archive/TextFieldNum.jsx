import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({numero}) {
  const [num, setNum] = React.useState();
  return (
    <Box component="form">
      <TextField
        type="number"
        id="outlined-basic"
        label={numero}
        variant="outlined"
        onChange={(e) => setNum(e.target.value)}
        value={num}
      />
    </Box>
  );
}