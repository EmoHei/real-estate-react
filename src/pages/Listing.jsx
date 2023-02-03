import React, { useEffect, useState } from 'react'
import "../pages/Listing.css"
import Spinner from "../components/spinner/SpinnerComp";
import { db } from "../firebase-config";
import Carousel from 'react-bootstrap/Carousel';
import {
    FaShare,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaParking,
    FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import SpinnerComp from '../components/spinner/SpinnerComp';
import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import Contact from "../components/Contact";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Listing() {
    const auth = getAuth();
    const params = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [contactLandlord, setContactLandlord] = useState(false);
    // For Slider
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    // =============
   
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId); // "listingId" is  parameter in App.js
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);

            }
        }

        fetchListing();

    }, [params.listingId]);
    if (loading) {
        return <SpinnerComp />;
    }

    return (
        <div style={{ paddingTop: '0px', width: '100%' }}>
            <Carousel
                fade
                className='slider-carousel'
                activeIndex={index} onSelect={handleSelect}
            >
                {listing.imgUrls.map((url, index) => (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            key={index}
                            style={{
                                background: `url(${listing.imgUrls
                                [index]})`,
                                height: '400px',
                                backgroundRepeat: 'no-repeat',
                                backgrounPosition: 'center',
                                backgroundSize: 'cover',
                                textAlign: 'center'

                            }} />
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>

    );
}
