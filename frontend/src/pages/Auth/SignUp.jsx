import React,{useContext,useState}  from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from "../../utils/helper";
import Input from '../../components/inputs/input';
import { Link } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
import {UserContext} from '../../context/userContext'; //import user context
import uploadImage from '../../utils/uploadimage'; //import upload image utility function

const SignUp = () => {
  const [profilePic ,setProfilePic] = useState(null);
  const [fullName,setFullName] =useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [adminInviteToken,setAdminInviteToken] =useState("");

  const [error, setError] = useState("");

  const {updateUser} =useContext(UserContext); //import updateUser from user context
  const navigate = useNavigate();

  //hanlde signUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl ='';

    if (!fullName) {
      setError("please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //SignUp API call
    try{
      //upload profile image if present
      if(profilePic){
        const imgUploadRes= await uploadImage(profilePic);
        profileImageUrl =imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
       name:fullName,
       email,
       password,
       profileImageUrl,
       adminInviteToken
      });

      const {token,role} =response.data;
 
      if(token)
      {
        localStorage.setItem("token",token);
        updateUser(response.data); //update user context with response data

        //redirect based on role
        if(role === "admin")
        {
          navigate("/admin/dashboard");
        }
        else{
          navigate("/user/dashboard");
        }
      }
    }catch(error){
      console.log("Login error:", error);
       if(error.response && error.response.data.message) {
        setError(error.response.data.message);
       }
       else{
        setError("An unexpected error occurred. Please try again later.");
       }
    }
  };

  return (
    <AuthLayout>
       <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>


        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage = {setProfilePic}/>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
            value ={fullName}
            onChange ={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder='john'
            type="text" />

            <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="min 8 Characters"
            type="password"
          />

          <Input
            value={adminInviteToken}
            onChange={({ target }) => setAdminInviteToken(target.value)}
            label="Admin Invite Token"
            placeholder="6 Digit code"
            type="text"
          />
          </div>
           {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="w-full text-sm font-medium text-white bg-blue-600 shadow-lg p-2.5 rounded-md my-1 hover:bg-blue-700 cursor-pointer"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
          
        </form>


       </div>
    </AuthLayout>
  )
}

export default SignUp