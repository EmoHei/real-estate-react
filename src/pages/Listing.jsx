import React, { useEffect, useState } from 'react'
import "../pages/Listing.css"
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
import { Button, Card, Container } from 'react-bootstrap';
import Contact from '../components/Contact';
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
        <Container className='container' >
            {listing.imgUrls.length > 1 ?
                <Carousel
                    fade
                    className='slider-carousel'
                    activeIndex={index} onSelect={handleSelect}
                >
                    {listing.imgUrls.map((url, index) => (
                        <Carousel.Item>
                            <img
                                alt=''
                                className="d-block w-100"
                                key={index}
                                style={{
                                    background: `url(${listing.imgUrls[index]})`, 
                                    height: '400px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                : <img
                alt=''
                    className="d-block w-100"
                    key={index}
                    style={{
                        background: `url(${listing.imgUrls[index]})`,
                        height: '400px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }} />
            }

            <div
                className='share-icon-container'
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShareLinkCopied(true)
                    setTimeout(() => {
                        setShareLinkCopied(false)
                    }, 2000)
                }}
            >
                < FaShare className='share-icon'></FaShare>
            </div>
            {shareLinkCopied && (<p className='share-text'>Link Copied</p>)}

            <Card className='content-container'>
                <h1 className='card.title' style={{ color: '#173F88', fontWeight: 'bold', marginBottom: '20px' }}>
                    {listing.name} -
                    <span> $
                        {listing.offer ?
                            listing.discountedPrice.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                            listing.regularPrice.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === 'rent' ? " / month" : ""}
                    </span>
                </h1>
                <p className='card-address'><FaMapMarkerAlt style={{ color: 'green' }} />{listing.address}</p>
                <div style={{ display: 'flex' }}>
                    <p className='rent-sale-btn'>
                        {listing.type === 'rent' ? "Rent" : "Sale"}
                    </p>
                    {listing.offer && (
                        <p className='offer-btn'>$ {(Number(listing.regularPrice) - Number(listing.discountedPrice)).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} discount</p>
                    )}

                </div>
                <p style={{ fontSize: '26px', fontWeight: 'bold' }}>
                    Description - <span style={{ fontWeight: '500', fontSize: '20px', color: 'gray' }}>{listing.description}</span>
                </p>
                <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <li style={{ display: 'flex', flexDirection: 'column' }}>
                        {+listing.bedrooms > 1 ?
                            `${listing.bedrooms} Beds` : " Bed"}
                        <FaBed></FaBed>
                    </li>
                    <li style={{ display: 'flex', flexDirection: 'column' }}>
                        {+listing.bathrooms > 1 ?
                            `${listing.bathrooms} Baths` : " Bath"}
                        <FaBath></FaBath>
                    </li>
                    <li style={{ display: 'flex', flexDirection: 'column' }}>
                        {+listing.parking > 1 ?
                            `${listing.parking} Parking spot` : " No parking"}
                        <FaParking></FaParking>
                    </li>
                    <li style={{ display: 'flex', flexDirection: 'column' }}>
                        {+listing.parking > 1 ?
                            `${listing.parking} Furnished` : " No furnished"}
                        <FaChair></FaChair>
                    </li>
                </ul>

                {listing.userRef !== auth.currentUser.uid
                    && !contactLandlord && (
                        <div style={{
                            margin: 'auto',
                            marginTop: '50px',
                            maxWidth: '300px'

                        }}>
                            <Button
                                onClick={() => setContactLandlord(true)}
                            > Contact Landlord</Button>
                        </div>
                    )
                }
                {contactLandlord && (
                    <Contact
                        userRef={listing.userRef}
                        listing={listing}
                    ></Contact>

                )}

            </Card>

        </Container>

    );
}
