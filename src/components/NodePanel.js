import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Paper, Typography } from '@mui/material';

const ItemTypes = {
  NODE: 'node',
};

const NodePanel = ({ setNodes }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    item: { type: 'textNode' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const addNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        type: 'textNode',
        data: { label: 'New Node' },
        position: { x: Math.random() * 250, y: Math.random() * 250 },
      },
    ]);
  };

  return (
    <Paper elevation={3} sx={{ width: 200, padding: 2, background: '#f0f0f0' }}>
      <Box
        ref={drag}
        sx={{
          padding: 2,
          border: '1px solid black',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: '#e0e0e0',
          '&:hover': { backgroundColor: '#d0d0d0' },
        }}
        onClick={addNode}
      >
        <Typography variant="h6">Text Node</Typography>
      </Box>
    </Paper>
  );
};

export default NodePanel;
