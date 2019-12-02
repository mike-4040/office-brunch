import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Copyright() {
  return (
    <Box mt={8}>
      <Typography variant='body1' color='textSecondary' align='center'>
        {`Copyright © Office Brunch ${new Date().getFullYear()}.`}
      </Typography>
    </Box>
  );
}

// export default Copyright;
