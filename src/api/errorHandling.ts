import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Error {
  message: string;
}

const errorHandle = (error: Error | AxiosError) => {
  try {
    // Check if the error is an AxiosError
    const axiosError = error as AxiosError;

    // If the error has a response, handle it
    if (axiosError.response?.data) {
      const errResp = axiosError.response.data as Error;
      
      // You can add conditions based on specific error messages, similar to the backend custom errors
      if (axiosError.response.status === 400) {
        toast.error("Bad Request: " + errResp.message); // Custom error handling for 400 (Bad Request)
      } else if (axiosError.response.status === 401) {
        toast.error("Unauthorized: " + errResp.message); // Custom error handling for 401 (Unauthorized)
      } else if (axiosError.response.status === 403) {
        toast.error("Forbidden: " + errResp.message); // Custom error handling for 403 (Forbidden)
      } else if (axiosError.response.status === 404) {
        toast.error("Not Found: " + errResp.message); // Custom error handling for 404 (Not Found)
      } else if (axiosError.response.status === 500) {
        toast.error("Internal Server Error: " + errResp.message); // Custom error handling for 500 (Server Error)
      } else {
        toast.error(errResp.message); // For other status codes, display the error message
      }
    } else {
      // If there's no response, it could be a network error or timeout
      toast.error("Network error. Please try again later.");
    }
  } catch (err) {
    toast.error("Something went wrong, please try again.");
  }
};

export default errorHandle;

// import  { AxiosError } from "axios"
// import { toast } from "react-toastify"


// interface Error {
//   message : string
// }


// const errorHandle = (error:Error|AxiosError)=> {
//   try {    
//     const axiosError = error as AxiosError
//     if(axiosError.response?.data){
//       const errResp = axiosError.response.data as Error
//       if(errResp.message.includes("Not authorized")){
//         toast.error("Please login before proceeding")
//       }else if(errResp.message == 'You are blocked by admin!'){
//         toast.error(errResp.message)
//       }else {
//         toast.error(errResp.message) 
//       }
//     }
//   } catch (error) {
//     toast.error("something went wrong please try again")
//   }
// }

// export default errorHandle