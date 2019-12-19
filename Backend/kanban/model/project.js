const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectname: {
        type: String
    },
    projectdescription: {
        type: String
    },
    projectcreationdate: {
        type: String
    },
    projectstartdate: {
        type: String
    },
    projectduedate: {
        type: String
    },
    todoworklimit: {
        type: String
    },
    wipworklimit: {
        type: String
    },
    doneworklimit: {
        type: String
    },
    projectcreator: {
        type: String
    },
    projectstatus: {
        type: String
    },
    projectTeam : [{
        teammemberusername : String, 
        teammemberemailid : String}],
    tasks : [{
        taskname : String, 
        taskdescription : String,
        taskcreationdate : String, 
        taskstartdate : String,
        taskduedate : String,
        taskassignedto : String, 
        taskpriority : String,
        taskcreator : String, 
        taskstatus : String,
        taskcomments : String
    }],
    taskactivities : [{
        taskactivitydate : String,
        taskactivitycomment : String
    }]
});

const Project = module.exports = mongoose.model('Project', projectSchema);