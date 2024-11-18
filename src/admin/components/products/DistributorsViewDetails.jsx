import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import compressor from '../../assets/comoressor 2.png';
import baseurl from '../../../apiService/apiService';
import axios from 'axios';

const DistributorsViewDetails = () => {
    const { id } = useParams();
    const [distributor, setDistributor] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDistributorDetails = async () => {
            console.log(distributor);
            try {
                setLoading(true);
                const response = await axios.get(`${baseurl}/api/getDistributorById/${id}`);
                setDistributor(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching distributor details:', error);
                setError('Failed to load distributor details');
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if we don't have the distributor data from state
        if (!distributor) {
            fetchDistributorDetails();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="productDetailsContainer" style={{ width: '80%' }}>
            <section className="section-1">
                <div className="productImageSection">
                    {distributor?.images ? (
                        <img 
                            src={`${baseurl}/${distributor.images}`} 
                            alt="Distributor" 
                            className="mainImage" 
                            onError={(e) => {
                                e.target.src = compressor; // Fallback image
                            }}
                        />
                    ) : (
                        <img src={compressor} alt="Default" className="mainImage" />
                    )}
                </div>
            </section>

            <section className="section-2">
                <div className="productInfoSection">
                    <div className="additionalInfo">
                        <h4>Distributors details</h4>
                        <p><strong>Company Name:</strong> {distributor?.companyname || 'N/A'}</p>
                        <p><strong>Location:</strong> {distributor?.location || 'N/A'}</p>
                        <p><strong>GST Number:</strong> {distributor?.gstnumber || 'N/A'}</p>
                        <p><strong>Credit Limit:</strong> {distributor?.creditlimit || 'N/A'}</p>
                        <p><strong>Name:</strong> {distributor?.contact_person_name || 'N/A'}</p>
                        <p><strong>Phone Number:</strong> {distributor?.phoneno || 'N/A'}</p>
                        <p><strong>Email:</strong> {distributor?.email || 'N/A'}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DistributorsViewDetails;