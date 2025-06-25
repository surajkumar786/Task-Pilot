import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  //append image file to form data
  formData.append("image",imageFile);

  try{
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type':'multipart/form-data', // Set the Content type to multipart/form-data

      },
  });
  return response.data; //return the response data
} catch(error){
  console.error("error while uploading the image:",error);
  throw error; //rethrow error for handling
}
};

export default uploadImage;