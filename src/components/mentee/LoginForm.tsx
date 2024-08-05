import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RiEyeCloseFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

// Assuming SignupInputField is located in `../common/SignupInputField`
import SignupInputField from '../common/SignupInputField';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await axios.post('/api/login', { ...data, role });
      if (response.data.success) {
        toast.success('Login successful!');
        // Handle successful login, e.g., redirect to dashboard
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-2 text-base text-white max-md:mt-10 max-md:max-w-full">
        {/* Toggle Bar */}
        <div className="flex justify-between mb-6 text-lg font-semibold text-gray-300">
          <button
            className={`flex-1 py-2 ${role === 'mentee' ? 'bg-blue text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setRole('mentee')}
          >
            I'm a Mentee
          </button>
          <button
            className={`flex-1 py-2 ${role === 'mentor' ? 'bg-blue text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setRole('mentor')}
          >
            I'm a Mentor
          </button>
        </div>
        <h1 className="text-5xl font-semibold tracking-tighter leading-[61.88px] max-md:max-w-full max-md:text-4xl">
          Log in to your account.
        </h1>
        <button className="flex justify-center items-center p-4 mt-11 font-semibold tracking-normal leading-7 text-right bg-slate-800 rounded-[35px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-3.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fde9b1bb924442aad0475359f42cf301a57185969732205b7dafd0b05a712070?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
              alt="Google logo"
              className="shrink-0 my-auto aspect-square w-[23px]"
            />
            <span>Sign in with Google</span>
          </div>
        </button>
        <form className="flex flex-col mt-10" onSubmit={handleSubmit(onSubmit)}>
          <SignupInputField
            label="Email Address"
            placeholder="i.e. davon@mail.com"
            type="email"
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address',
              },
            })}
            error={errors.email}
            onChange={(e) => setValue('email', e.target.value.trim())}
          />
          <SignupInputField
            label="Password"
            placeholder="**********"
            type={showPassword ? 'text' : 'password'}
            register={register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            error={errors.password}
            icon={showPassword ? <FaEye onClick={() => setShowPassword(!showPassword)} /> : <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} />}
            onChange={(e) => setValue('password', e.target.value.trim())}
          />
          <button type="submit" className="px-4 py-3.5 mt-8 max-w-full font-semibold tracking-normal leading-7 text-center bg-blue rounded-[50px] w-[175px] max-md:px-5">
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm leading-6 text-blue max-md:max-w-full">
          Don't have an account?{" "}
          <a href="#" className="font-semibold text-blue">Create free account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
