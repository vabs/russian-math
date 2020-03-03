import React from "react";
import Box from '@material-ui/core/Box';

const Logger = (props) => {
    return (
        <Box bgcolor="success.main" 
            color="primary.contrastText" 
            m={2} 
            p={2}
            textAlign="left"
            className="pi"
            display="block"
        >
          {props.log}
        </Box>
    )
}

export default Logger;