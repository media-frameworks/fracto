const express = require("express");
const cors = require('cors');
const fs = require('fs');

app = express();
const PORT = 3098

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors({
   origin: "*"
}));

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
