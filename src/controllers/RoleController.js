const roleModel = require("../models/RoleModel");
const getAllroles = async (req,res) => {
    const roles = await roleModel.find();

    res.json({
        message:"role fetched succcessfully",
        data: roles,
    });
};

const addRole = async (req, res) => {
    const saveRole = await roleModel.create(req.body)

    res.json({
        message:"role creatred.....",
        data:saveRole
    });
};

const deleteRole = async(req,res)=>{

    const deletedRole = await roleModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"role deleted successfully..",
      data:deletedRole
    })
}

const getRoleById = async (req,res)  =>{

    const foundRole = await roleMModel.findById(req.params.id)
    res.json({
        message:"role fatched..",
        data:foundRole
    })
}

module.exports = {
    getAllroles,addRole,deleteRole,getRoleById
};