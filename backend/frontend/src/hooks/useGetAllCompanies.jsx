import { setCompanies } from '@/redux/companySlice';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController(); // For handling cleanup
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${ADMIN_API_END_POINT}/companies`, {
                    withCredentials: true,
                    signal: controller.signal, // Abort request if necessary
                });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    console.log('Failed to fetch companies:', res.data.message);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.error('Error fetching companies:', error.response?.status, error.message);
                }
            }
        };

        fetchCompanies();
        
        return () => {
            controller.abort(); // Cleanup
        };
    }, [dispatch]); 
};

export default useGetAllCompanies;
