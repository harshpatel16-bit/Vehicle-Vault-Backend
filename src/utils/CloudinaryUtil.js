const cloudinary = require("cloudinary").v2;



const uploadFileToCloudinary = async (file) => {

    //conif
        cloudinary.config({
        cloud_name:"dkgkunrvz",
        api_key:"154278618583792",
        api_secret:"ogX0Rp2u_stkZtqLrmxTGXgNZ-s"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}