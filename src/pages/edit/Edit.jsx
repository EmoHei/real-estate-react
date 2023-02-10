import React, { useEffect, useState } from 'react';
import { db,} from "../../firebase-config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import '../create/Create.css'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useNavigate, useParams, } from 'react-router-dom';
import {  doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from "uuid";  // Install package -  npm i uuid
import SpinnerComp from "../../components/spinner/SpinnerComp"

export default function Edit() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

  const params = useParams(); // Importend
//  Only author can update
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [auth.currentUser.uid, listing, navigate]);
  
  // fetching data and fill the form
  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId); // import params hook !!
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    }
    fetchListing();
  }, [navigate, params.listingId]);

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        // TODO
        [e.target.id]: e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }


    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all([...images]
      .map((image) => storeImage(image)))
      .catch((error) => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing Edited ");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <SpinnerComp />;
  }


  return (
    <Container fluid="md">
      <Form onSubmit={onSubmit}>

        <Row>
          <Col >
            <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Update Listing</h1>
          </Col>
        </Row>
        {/* Sell /Rent */}
        <Row className=''>

          <h6 style={{ textAlign: 'center', marginTop: '30px' }} >
            Sell / Rent
          </h6>
          <Col>
            <Button
              type="button"
              id="type"
              value="sale"
              onClick={onChange}
              variant={`${type === "rent"
                ? "outline-secondary"
                : "secondary"
                }`}>Sell</Button>
          </Col>

          <Col>
            <Button
              type="button"
              id="type"
              value="rent"
              onClick={onChange}
              variant={`${type === "sell"
                ? "outline-secondary"
                : "secondary"
                }`}
            >Rent</Button>
          </Col>




        </Row>
        {/* Name */}
        <Row className='row-name input-row'>

          <FloatingLabel> Name</FloatingLabel>
          <Col className='col-name input-col'>
            <Form.Control
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              maxLength="32"
              minLength="10"
              required
            >

            </Form.Control>
          </Col>
        </Row>
        {/* Beds / Baths */}
        <Row className='beds-baths-row' >

          <FloatingLabel>Beds</FloatingLabel>

          <Col className='beds-baths-col'>
            <Form.Control
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required

            >
            </Form.Control>
          </Col>

          <FloatingLabel>Baths</FloatingLabel>
          <Col className='col-name'>
            <Form.Control
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
            >

            </Form.Control>
          </Col>
        </Row>
        {/* Parking */}
        <Row className=''>
          <h6 style={{ textAlign: 'center', marginTop: '30px' }} >
            Parking spot
          </h6>
          <Col className=''>

            <Button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              variant={`${!parking ? "outline-secondary" : "secondary"
                }`}
            >Yes</Button>
          </Col>
          <Col className=''>

            <Button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              variant={`${parking ? "outline-secondary" : "secondary"
                }`}
            >No </Button>
          </Col>
        </Row>
        {/* Furnished */}
        <Row className=''>
          <h6 style={{ textAlign: 'center', marginTop: '30px' }} >
            Furnished
          </h6>
          <Col className=''>
            <Button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              variant={`${!furnished ? "outline-secondary" : "secondary"}`}
            >Yes</Button>
          </Col>
          <Col className=''>
            <Button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              variant={`${furnished ? "outline-secondary" : "secondary"}`}
            >No</Button>
          </Col>

        </Row>
        {/* Address */}
        <Row className='row-address input-row'>
          <FloatingLabel> Address</FloatingLabel>
          <Col className='col-address input-col'>
            <Form.Control
              as="textarea"
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
            >
            </Form.Control>
          </Col>
        </Row>

        {/* Geolocation */}

        {/* Description */}
        <Row className='row-description input-row'>

          <FloatingLabel> Description</FloatingLabel>
          <Col className='col-description input-col'>
            <Form.Control
              as="textarea"
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
            >

            </Form.Control>
          </Col>
        </Row>
        {/* Offer*/}
        <Row className='radio-btn-row'>

          <h6 style={{ textAlign: 'center', marginTop: '30px' }} >
            Offer
          </h6>
          <Col className=''>
            <Button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              variant={`${!offer ? "outline-secondary" : "secondary"
                }`}
            >
              yes
            </Button>
          </Col>
          <Col className=''>
            <Button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              variant={`${offer ? "outline-secondary" : "secondary"
                }`}
            >
              no
            </Button>
          </Col>
        </Row>
        {/* RegularPrice / DiscountedPrice /*/}
        <Row className='' >

          <FloatingLabel>Regular price</FloatingLabel>

          <Col className=''>
            <Form.Control
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onChange}
              min="50"
              max="400000000"
              required
            >
            </Form.Control>
            {type === "rent" && (
              <div className="">
                <p className="text-md w-full whitespace-nowrap">$ / Month</p>
              </div>
            )}
          </Col>
          {offer && (
            <>
              <FloatingLabel>Discounted price</FloatingLabel>
              <Col className=''>
                <Form.Control
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required
                >
                </Form.Control>
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                  </div>
                )}
              </Col>
            </>
          )}


        </Row>
        {/* Images / Files */}
        <Row>
          <FloatingLabel>Select Images</FloatingLabel>
          <FloatingLabel>The first image will be the cover (max 6)</FloatingLabel>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                type="file"
                id="images"
                onChange={onChange}
                accept=".jpg,.png,.jpeg"
                multiple
                required

              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="submit"
            // disabled={progress !== null && progress < 100}
            >
              Update Listing
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

