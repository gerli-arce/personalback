const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const BranchRoutes = require("./BranchRoutes.js");
const RoleRoutes = require("./RoleRoutes.js");
const PeopleRoutes = require("./PeopleRoutes.js");
const UserRoutes = require("./UserRoutes.js");

router.get('/', (req, res) => {
  res.json({ message: 'API V1' });
});


router.use('/branches', BranchRoutes);
router.use('/roles', RoleRoutes);
router.use('/people', PeopleRoutes);
router.use('/users', UserRoutes);


module.exports = router;