// index.js
const express = require('express');
const apiRoutes = require('./routes/route');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

app.use(express.json());
const _dirname = path.dirname("")
const buildpath = require(_dirname, "../frontend/build")
app.use(express.static(buildpath))
app.use(
  cors({
    "origin": "*"
  })
)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
