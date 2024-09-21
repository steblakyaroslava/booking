const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    value: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
