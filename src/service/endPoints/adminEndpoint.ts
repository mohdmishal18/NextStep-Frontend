const adminRoutes = {
    Signin: '/admin/login',
    googleAuth: "/mentee/google-login",
    logout: 'admin/logout',

    //skills
    getSkills: '/admin/get-skills',
    addSkill: '/admin/add-skill',
    editSkill: '/admin/edit-skill',
    unListSkill: '/admin/unListSkill',

    //mentee
    getMentees: '/admin/get-mentees',
    blockMenetee: '/admin/block-mentee',

    //mentor
    getMentor: '/admin/get-mentors',
    blockMentor: '/admin/block-mentor',

}


export default adminRoutes