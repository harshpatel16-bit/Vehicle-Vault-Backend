const cloudinary = require("cloudinary").v2;



const uploadFileToCloudinary = async (file) => {

    //conif
        cloudinary.config({
        cloud_name:"",
        api_key:"",
        api_secret:""
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}
