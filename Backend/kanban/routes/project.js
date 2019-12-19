const express = require('express');
const Project = require('../model/project');
const router = express.Router();

router.post('/addproject',(req,res,next)=>{
    const project = new Project({
        projectname : req.body.projectname,
        projectdescription : req.body.projectdescription,
        projectcreationdate : req.body.projectcreationdate,
        projectstartdate : req.body.projectstartdate,
        projectduedate : req.body.projectduedate,
        todoworklimit : req.body.todoworklimit,
        wipworklimit : req.body.wipworklimit,
        doneworklimit : req.body.doneworklimit,
        projectcreator : req.headers.projectcreator,
        projectstatus : req.body.projectstatus,
    });
    project
        .save()
            .then(result => {
                projectcreator = req.body.projectcreator
                Project.find({projectcreator:projectcreator})
                .then(result1 => {res.send
                    ({
                        message: "Your project has created successfully!"
                    })
                })
                .catch(err => {
                    console.log(err);
                });
                
            })
            .catch(err => {
                console.log(err);
            });
    })

router.get('/projectbyprojectcreator',(req,res,next)=>{
    projectcreator = req.headers.projectcreator;
    Project.find({projectcreator:projectcreator})
    .then(result => {
        res.send(result)
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/projectbyprojectid',(req,res,next)=>{
    projectid = req.headers.projectid;
    Project.findById(projectid)
    .then(result => {
        res.send(result)
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/projectupdate',(req,res,next)=>{
        projectid = req.body.projectid,
        projectname = req.body.projectname,
        projectdescription =  req.body.projectdescription,
        projectcreationdate = req.body.projectcreationdate,
        projectstartdate = req.body.projectstartdate,
        projectduedate = req.body.projectduedate,
        todoworklimit = req.body.todoworklimit,
        wipworklimit = req.body.wipworklimit,
        doneworklimit = req.body.doneworklimit,
        projectstatus = req.body.projectstatus
        Project.findByIdAndUpdate(projectid, {$set:{
        projectid:projectid,
        projectname:projectname, 
        projectdescription:projectdescription,
        projectcreationdate : projectcreationdate,
        projectstartdate : projectstartdate,
        projectduedate : projectduedate,
        todoworklimit : todoworklimit,
        wipworklimit : wipworklimit,
        doneworklimit : doneworklimit,
        projectstatus : projectstatus,
        }})
         .then(result => {
                res.send('Project Updated')
            })
            .catch(err => {
                console.log(err);
            });
        });

router.delete('/deletebyprojectid',(req,res,next)=>{
    projectid = req.query.projectid;
    Project.deleteOne({ projectid: projectid })
    .then(result => {
        res.send("project deleted")
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/addtaskbyprojectid',(req,res,next)=>{
    console.log("inside add task")
    console.log("Projectid:"+req.headers.id)
    projectid = req.headers.id,
    taskname = req.body.taskname,
    taskdescription =  req.body.taskdescription,
    taskcreationdate = req.body.taskcreationdate,
    taskstartdate = req.body.taskstartdate,
    taskduedate = req.body.taskduedate,
    taskassignedto = req.body.taskassignedto
    taskpriority = req.body.taskpriority,
    taskcreator = req.body.taskcreator,
    taskstatus = req.body.taskstatus,
    taskcomments = req.body.taskcomments
    Project.findByIdAndUpdate(projectid, {$push:{"tasks":{
    taskname:taskname,
    taskdescription:taskdescription, 
    taskcreationdate:taskcreationdate,
    taskstartdate : taskstartdate,
    taskduedate : taskduedate,
    taskassignedto : taskassignedto,
    taskpriority : taskpriority,
    taskcreator : taskcreator,
    taskstatus : taskstatus,
    taskcomments : taskcomments
    }}})
     .then(result => {res.send
            ({
                message: "Your task has created successfully!"
            })
        })
        .catch(err => {
            console.log(err);
        });
    });

router.get('/taskbytaskid',(req,res,next)=>{
    taskid = req.headers.taskid;
    taskval = []
    console.log(taskid)
    Project.findOne({'tasks._id':taskid})
    .then(result => {
        taskval = result.tasks
        /* taskval.forEach(element => {
            if(element._id != taskid){
                taskval.pop(element)
            }
            console.log("taskval:"+taskval)
        }); */
        var filtered = taskval.filter(function(value, index, arr){

            return value._id == taskid;
        });

        var val ={
            _id: filtered[0]._id,
            taskname: filtered[0].taskname,
            taskdescription : filtered[0].taskdescription,
            taskstartdate : filtered[0].taskstartdate.substring(0,10),
            taskduedate : filtered[0].taskduedate.substring(0,10),
            taskpriority : filtered[0].taskpriority,
            taskstatus : filtered[0].taskstatus
        }

        res.send(val)
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/taskbyprojectid',(req,res,next)=>{
    projectid = req.headers.id;
    /* console.log(projectid) */
    Project.findById(projectid)
    .then(result => {
        res.send({
            id: req.headers.id,
            tasks : result.tasks
        })
    })

    .catch(err=>{
        console.log(err);
    })
})

router.post('/updatetask',(req,res,next)=>{
    console.log("Inside Updatetask")
    projectid = req.headers.proid;
    taskid = req.headers.taskid;
    taskname = req.body.taskname;
    taskdescription =  req.body.taskdescription,
    taskcreationdate = req.body.taskcreationdate,
    taskstartdate = req.body.taskstartdate,
    taskduedate = req.body.taskduedate,
    taskassignedto = req.body.taskassignedto
    taskpriority = req.body.taskpriority,
    taskcreator = req.body.taskcreator,
    taskstatus = req.body.taskstatus,
    taskcomments = req.body.taskcomments
    console.log("ProjectId  "+projectid)
    console.log("taskid  "+taskid)
    console.log("taskname  "+taskname)
    Project.updateOne({'tasks._id': taskid },
    {$set: {
        'tasks.$.taskname': taskname,
        'tasks.$.taskdescription': taskdescription,
        'tasks.$.taskcreationdate': taskcreationdate,
        'tasks.$.taskstartdate': taskstartdate,
        'tasks.$.taskduedate': taskduedate,
        'tasks.$.taskassignedto': taskassignedto,
        'tasks.$.taskpriority': taskpriority,
        'tasks.$.taskcreator' : taskcreator,
        'tasks.$.taskstatus': taskstatus,
        'tasks.$.taskcomments': taskcomments
    }})
    .then(result =>  {res.send
        ({
            message: "Your task has updated successfully!"
        })
    })
    .catch(err=>{
        console.log(err);
    })
})





module.exports = router;