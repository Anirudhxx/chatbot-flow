import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodePanel from './NodePanel';
import SettingsPanel from './SettingsPanel';
import { Box, Button, Container } from '@mui/material';

const initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
  },
];

const TextNode = ({ data }) => (
  <Box
    sx={{
      padding: 2,
      border: '1px solid black',
      backgroundColor: '#fff',
      borderRadius: '4px',
    }}
  >
    {data.label}
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </Box>
);

const nodeTypes = { textNode: TextNode };

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = (event, node) => setSelectedNode(node);

  const handleSave = () => {
    const invalidNodes = nodes.filter(
      (node) =>
        node.type === 'textNode' &&
        !edges.some((edge) => edge.source === node.id)
    );
    if (invalidNodes.length > 1) {
      alert('There are more than one nodes with empty target handles.');
    } else {
      alert('Flow saved successfully!');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', display: 'flex' }}>
      {selectedNode ? (
        <SettingsPanel node={selectedNode} setNodes={setNodes} />
      ) : (
        <NodePanel setNodes={setNodes} />
      )}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          Save Flow
        </Button>
      </Box>
    </Container>
  );
}

export default FlowBuilder;
