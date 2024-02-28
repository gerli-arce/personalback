const express = require('express');
const router = express.Router();

const BranchRoutes = require("./BranchRoutes.js");
const RoleRoutes = require("./RoleRoutes.js");
const PeopleRoutes = require("./PeopleRoutes.js");
const UserRoutes = require("./UserRoutes.js");

router.use('/branches', BranchRoutes);
router.use('/roles', RoleRoutes);
router.use('/people', PeopleRoutes);
router.use('/users', UserRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API V1' });
});

module.exports = router;