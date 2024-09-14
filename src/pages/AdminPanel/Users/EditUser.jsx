import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { updateUsers } from '../../../components/Redux/Slice/user';
import instance from '../../../Instance/axios';
import CloseBtn from '../../../components/Buttons/CloseBtn';

function EditUser({ user, onClose }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phone || '');
    const [selectedRole, setSelectedRole] = useState(user.role || '');
    const [selectedStatus, setSelectedStatus] = useState(user.status || '');
    const [profileImage, setProfileImage] = useState(user.profileImage || ''); 

    const users = useSelector(state => state.auth.user); // Get user from Redux state
    const userID = users?._id;

    useEffect(() => {
        setProfileImage(user.profileImage || 'https://source.unsplash.com/random/?superbike');
    }, [user]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleStatusChange = (e) => setSelectedStatus(e.target.value);
    const handleRoleChange = (e) => setSelectedRole(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            name === user.username &&
            email === user.email &&
            phoneNumber === user.phone &&
            selectedRole === user.role &&
            selectedStatus === user.status
        ) {
            toast.info("Nothing has changed.", {
                autoClose: 3000,
                position: "top-center"
            });
            return;
        }

        try {
            console.log(userID,'user');
            
            const response = await instance.put(`/api/v1/updateUser/${userID}`, {
                name,
                email,
                phone: phoneNumber,
                role: selectedRole,
                status: selectedStatus
            }, { withCredentials: true });

            console.log(response,'ppp');
            
            dispatch(updateUsers(response.data.user));
            if (response.data.success) {
                toast.success(response.data.message, {
                    autoClose: 3000,
                    position: "top-center"
                });
                onClose(); // Close the dialog
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", {
                autoClose: 3000,
                position: "top-center"
            });
        }
    };

    return (
        <div className="App">
            <CloseBtn onClose={onClose} />
            <form className='user-form' onSubmit={handleSubmit}>
                <div className='hd'>
                    <h3>Edit User</h3>
                </div>
                <div className='profile-image'>
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-img" />
                    ) : (
                        <div className="placeholder-image">No Image</div>
                    )}
                </div>
                <div className='u-box'>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="user-field"
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="user-field"
                        placeholder="Email"
                    />
                </div>
                <div className='u-box'>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="user-field"
                        placeholder="Phone Number"
                    />
                    <div className='optn'>
                        <select value={selectedRole} onChange={handleRoleChange}>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select value={selectedStatus} onChange={handleStatusChange}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className='u-btn'>
                    <button type="submit" className="sbt-btn">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default EditUser;
