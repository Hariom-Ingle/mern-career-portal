import { setUsers } from '@/redux/adminSlice';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController(); // For handling cleanup
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${ADMIN_API_END_POINT}/users`, {
                    withCredentials: true,
                    signal: controller.signal, // Abort request if necessary
                });
                if (res.data.success) {
                    dispatch(setUsers(res.data.users));
                } else {
                    console.log('Failed to fetch users:', res.data.message);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.error('Error fetching users:', error.response?.status, error.message);
                }
            }
        };

        fetchUsers();

        return () => {
            controller.abort(); // Cleanup 
        };
    }, [dispatch]);
};

export default useGetAllUsers;
