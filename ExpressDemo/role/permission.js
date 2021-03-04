const {ROLE} = require('../assets/ultity/myConstanst');


const CanViewProject = (project , user) => {

    console.log(project);
    return project.userId === user.id || user.role === ROLE.ADMIN 
}

const ScopedProject = (projects , user) => {
    console.log(user);
    if (user.role === ROLE.ADMIN ) return projects ; 

    

    return projects.filter(project => project.userId === user.id);
}
module.exports = {
    CanViewProject , 
    ScopedProject
}