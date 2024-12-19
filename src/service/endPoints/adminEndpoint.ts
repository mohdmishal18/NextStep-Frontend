const adminRoutes = {
    Signin: '/admin/login',
    googleAuth: "/mentee/google-login",
    logout: 'admin/logout',

    //skills
    getSkills: '/admin/get-skills',
    addSkill: '/admin/add-skill',
    editSkill: '/admin/edit-skill',
    listSkill: '/admin/list-skill',

    //mentee
    getMentees: '/admin/all-mentees',
    blockMentee: '/admin/block-mentee',

    //mentor
    getMentor: '/admin/get-mentors',
    blockMentor: '/admin/block-mentor',
    getApplications: '/admin/all-applications',
    approve: '/admin/approve-mentor',
    reject: '/admin/reject-mentor',
    getApproved: '/admin/approved-mentors',
    GetMentorById: "/admin/getMentorById"

}


export default adminRoutes