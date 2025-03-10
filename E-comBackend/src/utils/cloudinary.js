import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })

        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteFromCloudinary = async(publicId) => {
    try {
        if(!publicId){
            return false;
        }

        const response = await cloudinary.uploader.destroy(publicId);

        if(response.result !== "ok" || response.result === "not found"){
            console.log("Cloudinary deletion failed :",response)
            return {success :false};
        }
        return {success : true};
    } catch (error) {
        console.error("Error deleting file from cloudinary :" , error);
        return false;
    }
}


const extractPublicIdFromUrl = (imageUrl) => {
    const parts = imageUrl.split("/");
    const publicIdWithExtension = parts[parts.length - 1]; // "sample.jpg"
    return publicIdWithExtension.split(".")[0]; // "sample"
};

export {
    uploadOnCloudinary,
    deleteFromCloudinary,
    extractPublicIdFromUrl
}
