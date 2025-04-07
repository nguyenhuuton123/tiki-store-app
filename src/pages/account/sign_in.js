import React, {useEffect, useState} from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import {logoWhite} from "../../assets/images";
import {loginAsync, selectIsAuthenticated, selectUser} from "../../features/user/auth_silce";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errUsername, setErrUsername] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setErrUsername("");
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    };

    useEffect(() => {
        if (isAuthenticated) {
            setSuccessMsg(
                `Hello dear, Thank you for your attempt. We are processing to validate your access. 
        Till then stay connected and additional assistance will be sent to you by your mail at ${username}`
            );
            setUsername("");
            setPassword("");

            if (user.roles.includes("ROLE_ADMIN")) {
                navigate("/admin");
            } else if (user.roles.includes("ROLE_USER")) {
                navigate("/");
            }

            localStorage.setItem("accessToken", user.token);

        }
    }, [isAuthenticated, username, navigate, user]);

    const handleSignIn = async (e) => {
        e.preventDefault();

        const usernamePattern = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
        const passwordPattern = /^[a-zA-Z0-9!@#$%^*)(+=._-]{6,}$/;

        if (!username) {
            setErrUsername("Enter your username");
        } else if (!usernamePattern.test(username)) {
            setErrUsername("Invalid email format");
        }

        if (!password) {
            setErrPassword("Enter your password");
        } else if (!passwordPattern.test(password)) {
            setErrPassword("Password must be at least 6 characters and may contain letters, numbers, and special characters");
        }

        if (username && password && usernamePattern.test(username) && passwordPattern.test(password)) {
            try {
                const response = await dispatch(loginAsync({username, password}));

                if (response.meta.requestStatus === "rejected") {
                    Swal.fire({
                        icon: "error",
                        title: response.payload.message || "An error occurred",
                        text: response.payload.status?.error || "",
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Welcome!",
                        text: "You have successfully logged in.",
                    });
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text: "Check your credentials",
                });
            }
        }
    };


    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
                <div className="w-[450px] h-full bg-primeColor px-12 flex flex-col gap-6 justify-center pt-10">
                    <Link to="/">
                        <img src={logoWhite} alt="logoImg" className="w-56"/>
                    </Link>
                    <div className="flex flex-col gap-1 -mt-1">
                        <h1 className="font-titleFont text-xl font-medium">
                            Stay sign in for more
                        </h1>
                        <p className="text-base">When you sign in, you are with us!</p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
                        <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with TikiStore
              </span>
                            <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
                        <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all TikiStore services
              </span>
                            <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
                        <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
                            <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <Link to="/">
                            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                                © TikiStore
                            </p>
                        </Link>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Terms
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Privacy
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Security
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full lgl:w-1/2 h-full">
                {successMsg ? (
                    <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
                        <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                            {successMsg}
                        </p>
                        <Link to="/signup">
                            <button
                                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold
            tracking-wide hover:bg-black hover:text-white duration-300"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                ) : (
                    <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
                        <div
                            className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                                Sign in
                            </h1>
                            <div className="flex flex-col gap-3">
                                {/* Username */}
                                <div className="flex flex-col gap-.5">
                                    <p className="font-titleFont text-base font-semibold text-gray-600">
                                        Username
                                    </p>
                                    <input
                                        onChange={handleUsername}
                                        value={username}
                                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                        placeholder="e.g: John1234"
                                    />
                                    {errUsername && (
                                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                            <span className="font-bold italic mr-1">!</span>
                                            {errUsername}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-.5">
                                    <p className="font-titleFont text-base font-semibold text-gray-600">
                                        Password
                                    </p>
                                    <input
                                        onChange={handlePassword}
                                        value={password}
                                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                    {errPassword && (
                                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                            <span className="font-bold italic mr-1">!</span>
                                            {errPassword}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleSignIn}
                                    className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                                >
                                    Sign In
                                </button>
                                <p className="text-sm text-center font-titleFont font-medium">

                                    <Link to="/forgot_password">
                    <span className="hover:text-blue-600 duration-300">
                      Forgot password?
                    </span>
                                    </Link>
                                </p>
                                <p className="text-sm text-center font-titleFont font-medium">
                                    Don't have an Account?{" "}
                                    <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
            )
        </div>
    );
};

export default SignIn;