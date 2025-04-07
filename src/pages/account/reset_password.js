import React, {useState} from 'react';
import {X} from 'phosphor-react';
import {useDispatch, useSelector} from 'react-redux';
import {
    sendOtpAsync,
    resetPasswordAsync,
    openResetPasswordOtpDialog,
} from '../../features/user/auth_silce';
import {Link} from 'react-router-dom';
import '../../assets/css/forgot_password.css';
import {logoLight} from "../../assets/images";
import {BsCheckCircleFill} from "react-icons/bs";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const sendOtpStatus = useSelector((state) => state.auth.sendOtpStatus);
    const verifyOtpForForgotPasswordStatus = useSelector(
        (state) => state.auth.verifyOtpForForgotPasswordStatus
    );
    const resetPasswordOtpDialogVisible = useSelector(
        (state) => state.auth.resetPasswordOtpDialogVisible
    );

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [validation, setValidation] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (value) => {
        setEmail(value);

        if (!validateEmail(value)) {
            setError('Invalid email address');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (value) => {
        setNewPassword(value);

        if (!validatePassword(value)) {
            setValidation(
                'Password must be at least 6 characters and contain at least one digit and one uppercase letter'
            );
        } else if (passwordConfirmation && value !== passwordConfirmation) {
            setValidation('Password and confirmation do not match');
        } else {
            setValidation('');
        }
    };

    const handleConfirmationChange = (value) => {
        setPasswordConfirmation(value);

        if (value !== newPassword) {
            setValidation('Password and confirmation do not match');
        } else {
            setValidation('');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSendEmail = async () => {
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        setError('');
        setValidation('');
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        dispatch(sendOtpAsync({email}));
        dispatch(openResetPasswordOtpDialog());
    };

    const handleVerifyOtpAndResetPassword = () => {
        if (!validatePassword(newPassword)) {
            setValidation(
                'Password must be at least 6 characters and contain at least one digit and one uppercase letter'
            );
            return;
        }

        if (newPassword !== passwordConfirmation) {
            setValidation('Password and confirmation do not match');
            return;
        }

        setValidation('');

        const verifyOtpRequest = {
            email,
            otp,
            newPassword,
        };
        dispatch(resetPasswordAsync(verifyOtpRequest));
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
        return regex.test(password);
    };

    return (
        <div className="container-forgot">
            <div className="left-forgot">
                <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
                    <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center pt-10">
                        <Link to="/">
                            <img src={logoLight} alt="logoImg" className="w-28"/>
                        </Link>
                        <div className="flex flex-col gap-1 -mt-1">
                            <h1 className="font-titleFont text-xl font-medium">
                                Forgot password
                            </h1>
                            <p className="text-base">If you have trouble, I will always be with you!</p>
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
            </div>
            <div className="right-forgot">
                <div className="title">
                    <p className="forgot">Forgot password</p>
                    <Link to="/signin">
                        <X size={20} color="#505c8c" weight="light"/>
                    </Link>
                </div>

                <div className="body">
                    {resetPasswordOtpDialogVisible ? (
                        <div className="otp-dialog">
                            <input
                                type="number"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder="New password"
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={passwordConfirmation}
                                onChange={(e) => handleConfirmationChange(e.target.value)}
                                placeholder="Confirm new password"
                            />
                            {error && (
                                <p style={{color: 'red'}} className="error">
                                    {error}
                                </p>
                            )}
                            {validation && (
                                <p style={{color: 'red', maxWidth: 300}} className="validation">
                                    {validation}
                                </p>
                            )}
                            <div className={"show_password"}>
                                <input
                                    id='showpass'
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={handleTogglePasswordVisibility}
                                    style={{marginBottom: 0, marginRight: 10, justifyContent: 'normal'}}
                                />
                                <label for="showpass">
                                    Show Password
                                </label>
                            </div>
                            <button
                                onClick={handleVerifyOtpAndResetPassword}
                                disabled={
                                    verifyOtpForForgotPasswordStatus === 'loading' ||
                                    newPassword !== passwordConfirmation
                                }
                            >
                                Reset Password
                            </button>
                        </div>
                    ) : (
                        <>
                            <input
                                type="email"
                                className="senEmail"
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                placeholder="Email"
                            />
                            <button
                                className="submit"
                                disabled={sendOtpStatus === 'loading' || loading}
                                onClick={handleSendEmail}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                            {error && (
                                <p style={{color: 'red'}} className="error">
                                    {error}
                                </p>
                            )}
                        </>
                    )}
                    <p className="text-sm text-center font-titleFont font-medium">
                        Did you remember your password?
                        <Link to="/signin">
                            <span>Sign in</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
