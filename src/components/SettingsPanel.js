import React from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';

const SettingsPanel = ({ node, setNodes }) => {
  const updateNodeData = (e) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, label: e.target.value } } : n
      )
    );
  };

  return (
    <Paper elevation={3} sx={{ width: 200, padding: 2, background: '#f0f0f0' }}>
      <Typography variant="h6">Settings</Typography>
      <TextField
        fullWidth
        label="Node Label"
        value={node.data.label}
        onChange={updateNodeData}
        margin="normal"
      />
    </Paper>
  );
};

export default SettingsPanel;
