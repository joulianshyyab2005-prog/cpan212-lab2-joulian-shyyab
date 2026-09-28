const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory tool library data
let tools = [
  { id: 1, name: 'Hammer', category: 'Hand Tools', available: true },
  { id: 2, name: 'Power Drill', category: 'Power Tools', available: false },
  { id: 3, name: 'Screwdriver Set', category: 'Hand Tools', available: true }
];

// GET /tools - Fetch all tools
app.get('/tools', (req, res) => {
  res.json(tools);
});

// GET /tools/:id - Fetch a single tool by ID
app.get('/tools/:id', (req, res) => {
  const toolId = parseInt(req.params.id);
  const tool = tools.find(t => t.id === toolId);
  if (!tool) {
    return res.status(404).json({ message: 'Tool not found' });
  }
  res.json(tool);
});

// POST /tools - Create a new tool
app.post('/tools', (req, res) => {
  const { name, category, available } = req.body;
  if (!name || !category) {
    return res.status(400).json({ message: 'Name and category are required' });
  }
  const newTool = {
    id: tools.length + 1,
    name,
    category,
    available: available !== undefined ? available : true
  };
  tools.push(newTool);
  res.status(201).json(newTool);
});

// DELETE /tools/:id - Delete a tool
app.delete('/tools/:id', (req, res) => {
  const toolId = parseInt(req.params.id);
  const toolIndex = tools.findIndex(t => t.id === toolId);
  if (toolIndex === -1) {
    return res.status(404).json({ message: 'Tool not found' });
  }
  tools.splice(toolIndex, 1);
  res.status(200).json({ message: 'Tool deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Tool Library API running on http://localhost:${PORT}`);
});