import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/adminDashBoard/Header';
import Sidebar from '../../../components/adminDashBoard/Sidebar';
import Footer from '../../../components/UserDashBoard/Layout/Footer/Footer';
import { useDispatch } from 'react-redux';
import instance from '../../../Instance/axios';
import { ToastContainer, toast } from 'react-toastify';
import { updateUsers } from '../../../components/Redux/Slice/user';
import CloseBtn from '../../../components/Buttons/CloseBtn';


function EditUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [user, setUser] = useState("");
    const [originalUser, setOriginalUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/api/v1/userDetails/${id}`, { withCredentials: true });
                const userData = response.data.user;
                setUser(userData);
                setOriginalUser(userData);
                setName(userData.username || '');
                setEmail(userData.email || '');
                setPhoneNumber(userData.phone || '');
                setSelectedRole(userData.role || '');
                setSelectedStatus(userData.status || '');
            } catch (error) {
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                    position: "top-center"
                });
            }
        };
        fetchData();
    }, [id]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleStatusChange = (e) => setSelectedStatus(e.target.value);
    const handleRoleChange = (e) => setSelectedRole(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            name === originalUser.username &&
            email === originalUser.email &&
            phoneNumber === originalUser.phone &&
            selectedRole === originalUser.role &&
            selectedStatus === originalUser.status
        ) {
            toast.info("Nothing has changed.", {
                autoClose: 3000,
                position: "top-center"
            });
            return;
        }

        try {
            const response = await instance.put(`/api/v1/updateUser/${id}`, {
                name,
                email,
                phone: phoneNumber,
                role: selectedRole,
                status: selectedStatus
            }, { withCredentials: true });
            dispatch(updateUsers(response.data.user));
            if (response.data.success) {
                toast.success(response.data.message, {
                    autoClose: 3000,
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate('/admin/users'); // Navigate to UserList page
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 3000,
                position: "top-center"
            });
        }
    };

    return (
        <div className="App">
            <Header />

            <div className="user-detail">
              <CloseBtn/>
                <form className='user-form' onSubmit={handleSubmit}>
                    <div className='hd'>
                        <h3 id='hdn'>Edit User</h3>
                    </div>
                    <div className='pp'>
                        <img src="https://source.unsplash.com/random/?superbike" alt="" />
                    </div>
                    <div className='u-box'>
                        <input
                            type="text"
                            value={name}
                            id="name"
                            onChange={handleNameChange}
                            className="user-field"
                        />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="user-field"
                        />
                    </div>
                    <div className='u-box'>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="user-field"
                        />
                        <div className='optn'>
                            <select id="role" value={selectedRole} onChange={handleRoleChange}>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                                <option value="admin">Admin</option>
                            </select>
                            <select id="status" value={selectedStatus} onChange={handleStatusChange}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className='u-btn'>
                        <button type="submit" className="sbt-btn">Submit</button>
                    </div>
                </form>
            </div>

            <Footer />
            <ToastContainer />
        </div>
    )
}

export default EditUser;
