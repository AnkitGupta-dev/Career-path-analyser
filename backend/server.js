const express = require('express');
const cors = require('cors');
const skillGapRoutes = require('./routes/skillGap');
const roadmapRoutes = require('./routes/roadmap');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
