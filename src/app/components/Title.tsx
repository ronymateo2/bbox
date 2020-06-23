import React  from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

type Props = {
    children : PropTypes.ReactNodeLike 
}

export default function Title(props: Props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
