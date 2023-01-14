import '../create/Create.css';
import React, { useState } from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Create() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    description: "",
    offer: false,
    regularPrice: 0,
    discountPrice: 0,




  })
  const {
    type,
    name,
    bathrooms,
    bedrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountPrice,



  } = formData;

  function onChange() {

  }
  //  Bootstrap =======================================
  const [checked, setChecked] = useState(false);
  // const [sellRentValue, setSellRentValue] = useState('1');
  // const [parkingValue, setParkingValue] = useState('1');
  // const [furnishedValue, setFurnishedValue] = useState('1');

  // const sellRent = [
  //   { name: 'SELL', value: 'sell' },
  //   { name: 'RENT', value: 'rent' },
  // ];
  // const bedsBaths = [
  //   { name: 'Parking / YES', value: 'yes' },
  //   { name: 'Parking / NO', value: 'no' },
  // ];
  // const furnishedArr = [
  //   { name: 'Furnished / YES', value: 'yes' },
  //   { name: 'Furnished / NO', value: 'no' },
  // ];


  // =========================================================

  return (
    <main className='main-container'>
      <h1 className='title'>Create a Listing</h1>

      <div className="form-container">
        <form className='form'>

          <div className="row">

            <div className="left">

              <button
                type='button'
                id='type'
                value='sale'
                className={`${type === 'rent' ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                sell
              </button>
            </div>

            <div className="right">
              <button
                type='button'
                id='type'
                value='rent'
                className={`${type === 'sell' ? "dark-btn" : "light-btn"}`}
                onClick={onChange}
              >
                rent
              </button>
            </div>

          </div>

          <div className='row'>


            <div className="name-input-wrapper">
              <p>Name</p>
              <input
                className='name-input'
                type="text"
                placeholder='Name'
                id='name'
                value={name}
                onChange={onChange}
                maxLength="32"
                minLength="10"
                required
              />
            </div>

          </div>

          <div className="row">

            <div className='input-beds-wrapper '>
              <p>Beds</p>
              <input
                placeholder='Beds'
                type="number"
                id='bedrooms'
                value={bedrooms}
                onChange={onChange}
                min='1'
                max='50'
                required
              />
            </div>

            <div className='input-baths-wrapper '>
              <p>Baths</p>
              <input
                placeholder='Baths'
                type="number"
                id='bathrooms'
                value={bathrooms}
                onChange={onChange}
                min="1"
                required
              />
            </div>
          </div>

          <p>Parking spot</p>
          <div className="row">

            <div className="left">

              <button
                type='button'
                id='parking'
                value={true}
                className={`${!parking ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                yes
              </button>
            </div>

            <div className="right">
              <button
                type='button'
                id='parking'
                value={false}
                className={`${parking ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                no
              </button>
            </div>

          </div>

          <p>Furnished</p>
          <div className="row">

            <div className="left">

              <button
                type='button'
                id='furnished'
                value={true}
                className={`${!furnished ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                yes
              </button>
            </div>

            <div className="right">
              <button
                type='button'
                id='furnished'
                value={false}
                className={`${furnished ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                no
              </button>
            </div>

          </div>

          <div className='row'>
            <div className="wrapper">
              <p>Address</p>
              <textarea
                className='name-input'
                type="text"
                placeholder='Address'
                id='address'
                value={address}
                onChange={onChange}
                required
              />
            </div>

          </div>

          <div className='row'>
            <div className="wrapper">
              <p>Description</p>
              <textarea
                className='name-input'
                type="text"
                placeholder='Description'
                id='description'
                value={description}
                onChange={onChange}
                maxLength="100"
                minLength="10"
                required
              />
            </div>

          </div>
          {/* Offer */}
          <p>Offer</p>
          <div className="row">

            <div className="left">

              <button
                type='button'
                id='offer'
                value={true}
                className={`${!offer ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                yes
              </button>
            </div>

            <div className="right">
              <button
                type='button'
                id='offer'
                value={false}
                className={`${offer ? "light-btn" : "dark-btn"}`}
                onClick={onChange}
              >
                no
              </button>
            </div>

          </div>

          {/* Regular Price */}
          <div className="row">

            <div className='input-beds-wrapper'>
              <p>Regular Price</p>
              <input
                placeholder='Regular Price'
                type="number"
                id='regularPrice'
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400 000 000"
                required
              />
            </div>
            {type === "rent" && (
              <div className=' pricePerMonth' >
                <p>$ / months</p>
              </div>
            )}


          </div>

          {/* Discount Price */}
          {offer && (
            <div className="row">
              <p>Discount Price</p>
              <div className='input-beds-wrapper'>

                <input
                  placeholder='Discount Price'
                  type="number"
                  id='discountPrice'
                  value={discountPrice}
                  onChange={onChange}
                  min='50'
                  max='400 000 00'
                  required={offer}
                />

              </div>
              {type === "rent" && (
                <div className=' pricePerMonth' >
                  <p>$ / months</p>
                </div>
              )}

            </div>
          )}

          {/* Images */}
          <p>Images</p>
          <span>The first image will be the cover. (max 6 images) </span>
          <div className="row">
            <input
              type="file"
              id='images'
              onChange={onChange}
              accept=".jpg, png, jpeg"
              multiple
              required
            />

          </div>

          <button 
          className="submit-btn"
          type='submit'>
            Create Listing
          </button>



        </form>



        {/* WITH BOOTSTRAP */}

        {/* <Form>
          <FormGroup>
            <Row className="row row-btn" >
              <ButtonGroup className="mb-2">
                {sellRent.map((sellRent, idx) => (
               
                  <ToggleButton
                    key={idx}
                    id={`sellRent-${idx}`}
                    type="radio"
                    variant="outline-secondary"
                    className='btn'
                    name="sellRent"
                    value={sellRent.value}
                    checked={sellRentValue === sellRent.value}
                    onChange={(e) => setSellRentValue(e.currentTarget.value)}
                  >

                    {sellRent.name}
                  </ToggleButton> 
               
                ))}
              </ButtonGroup>
            </Row>

            <Row className="row">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder='Name'
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </Row>
            <Row className="row">
              <InputGroup className="mb-3 beds-baths">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Rooms
                </InputGroup.Text>
                <Form.Select aria-label="Default select example">
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="10+">10+</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className="mb-3 beds-baths">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Baths
                </InputGroup.Text>
                <Form.Select aria-label="Default select example">
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Form.Select>
              </InputGroup>
            </Row>
            <Row className="row row-btn" >
              <ButtonGroup className="mb-2">
                {bedsBaths.map((park, idx) => (
                  
                  <ToggleButton
                  
                    key={idx}
                    id={`park-${idx}`}
                    type="radio"
                    variant="outline-secondary"
                    className='btn'
                    name="park"
                    value={park.value}
                    checked={parkingValue === park.value}
                    onChange={(e) => setParkingValue(e.currentTarget.value)}

                  >
                    {park.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Row>
            <Row className="row row-btn" >
              <ButtonGroup className="mb-2">
                {furnishedArr.map((furnished, idx) => (

                  <ToggleButton

                    key={idx}
                    id={`furnished-${idx}`}
                    type="radio"
                    variant="outline-secondary"
                    className='btn'
                    name="furnished"
                    value={furnished.value}
                    checked={furnishedValue === furnished.value}
                    onChange={(e) => setFurnishedValue(e.currentTarget.value)}

                  >
                    {furnished.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Row>

          </FormGroup>
     
        </Form> */}

      </div>

    </main>
  )
}
