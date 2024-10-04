import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  FaChevronRight,
  FaUser,
  FaPhone,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import WhatNext from "@/components/makeup-artist/WhatNext";
import Contact from "@/components/makeup-artist/Contact";
import Offer from "@/components/miscellaneous/Offer";
import { useGlobalContext } from "@/context/MyContext";
import Head from "next/head";

function MakeupArtists() {
  const router = useRouter();
  const { userIP } = useGlobalContext();
  const [utm_source_active, setUtmSourceActive] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [csrfToken, setCsrfToken] = useState("");
  const [formData, setFormData] = useState({
    mobile: "",
    preference: "makeup-artists",
    name: "",
    token: "",
    recaptcha: "",
    is_ad: "0",
    user_ip: userIP,
    lead_from: "bestmakeupartistindelhi.com",
  });
  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN_API}/get-csrf`
      );
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {}
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUtmSource = localStorage.getItem("utm_source_active");
      if (storedUtmSource) {
        setUtmSourceActive(storedUtmSource);
        setFormData((prevData) => ({
          ...prevData,
          is_ad: storedUtmSource,
        }));
      }
    }
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "mobile") {
      if (value.length !== 10 || isNaN(value) || parseInt(value, 10) < 6000000000 || parseInt(value, 10) > 9999999999) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: "Phone number must be 10 digits and between 6000000000 and 9999999999",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: "",
        }));
      }
    }

    if (name === "name") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "Name is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile) {
      setErrors({
        ...errors,
        name: !formData.name ? "Name is required" : "",
        mobile:
          formData.mobile.length !== 10 ||
          isNaN(formData.mobile) ||
          parseInt(formData.mobile, 10) < 6000000000 ||
          parseInt(formData.mobile, 10) > 9999999999
            ? "Phone number must be valid"
            : "",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const security_token = await fetchCsrfToken();
      setFormData((prevData) => ({
        ...prevData,
        token: security_token,
      }));

      // console.log({ ...formData, token: security_token });

      const url = `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN}/venue-lead`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, token: security_token }),
      });

      response = await response.json();

      if (response.status === true) {
        router.push('/');
      } else {
        alert('Error submitting form: ' + response.message || "Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <>
    <Head>
      <title>Best Makeup Artist in Delhi</title>
    </Head>
      <Wrapper>
        <nav>
          <Image
            src={"/logo.png"}
            className="logo"
            width={200}
            height={60}
            alt="Logo"
          />
        </nav>
        <div className="banner">
        <div className="banner-heading-pc">
            <h1>Top Makeup Artists</h1>
            <p>Find the best makeup artists for your special day</p>
          </div>
          <div className="banner-heading">
            <h1>Top Makeup Artists</h1>
            <p>Find the best makeup artists for your special day</p>
          </div>
          <Image
            src="/makeup-artists/hero-banner-makeup-artist.png"
            alt="Makeup Artists Banner"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            priority={true}
            className="banner-img"
          />
          
          <div className="form-container desktop-form">
            <h3 className="form-heading">Get UpTo 40% Disscount</h3>
            <div className="form-sub-heading">
              Please share a few more details that would help us get you the best
              quotes
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group2">
                Select Your City{" "}
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="delhi-ncr">Delhi NCR</option>
                </select>
              </div>
              <div className="form-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <FaRegCalendarAlt className="input-icon" />
                <input
                  type="date"
                  id="event_date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  placeholder="Event Date"
                />
              </div>
              <div className="form-group">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
                {errors.mobile && (
                  <span className="error-text">{errors.mobile}</span>
                )}
              </div>
              <button type="submit" className="pc-form-submit" disabled={isSubmitting}>
                <div>
                  {isSubmitting ? "Submitting..." : "See Makeup Artists"}
                </div>
                &nbsp;&nbsp;&nbsp;
                {isSubmitting ? <Spinner /> : <FaChevronRight />}
              </button>
            </form>
          </div>
        </div>
        <Offer />

        <div className="form-container mobile-form">
          <h3 className="form-heading">Get UpTo 40% Disscount</h3>
          <div className="form-sub-heading">
            Please share a few more details that would help us get you the best quotes
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group2">
              Select Your City{" "}
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="delhi-ncr">Delhi NCR</option>
              </select>
            </div>
            <div className="form-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <FaRegCalendarAlt className="input-icon" />
              <input
                type="date"
                id="event_date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                placeholder="Event Date"
              />
            </div>
            <div className="form-group">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              {errors.mobile && (
                <span className="error-text">{errors.mobile}</span>
              )}
            </div>
            <button type="submit" className="mobile-form-submit" disabled={isSubmitting}>
              <div>
                {isSubmitting ? "Submitting..." : "See Makeup Artists"}
              </div>
              &nbsp;&nbsp;&nbsp;
              {isSubmitting ? <Spinner /> : <FaChevronRight />}
            </button>
          </form>
        </div>

        <WhatNext />
        <Contact />
      </Wrapper>
    </>
  );
}

export default MakeupArtists;


const Wrapper = styled.div`

  nav {
    background: var(--primary-color);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .banner {
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner-heading {
  display:none;
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    z-index: 5;
    max-width: 500px;
    text-align: left;
    h1 {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
    text-shadow:8px 2px 20px black;
  }
    p {
    font-size: 18px;
    margin-top: 10px;
    text-shadow:8px 2px 20px black;
  }

  }
   .banner-heading-pc {
  display: block;
    position: absolute;
    right: 80px;
    top: 10%;
    transform: translateY(-50%);
    color: white;
    z-index: 5;
    max-width: 500px;
    text-align: center;
    h1 {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
    text-shadow:8px 2px 20px black;
  }
    p {
    font-size: 18px;
    margin-top: 10px;
    text-shadow:8px 2px 20px black;
  }

  }


  .banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .form-container {
    background: rgba(255, 255, 255);
    padding: 20px;
    border-radius: 10px;
    height: 420px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 20;
    margin-top: 20px;
  }

  .form-heading{
    color: #404040;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
  }

  .form-sub-heading{
    color: #424242;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-top: 16px;
    margin-bottom: 15px;
  }
    .form-group {
  position: relative;
  margin-bottom: 15px;
}
  .input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 18px;
}

  .form-group2 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  select {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  text-align: center;
  background-color: #fff;
  margin-left: 10px;
}
}

  input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
}

  button {
    padding: 13px 20px;
    font-size: 16px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  .pc-form-submit{
    display:flex;
    justify-content: center;
  }
  .mobile-form-submit{
    position: fixed;
    bottom: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 9999;
    height: 65px;
    border-radius: 0;
    margin: 0 0 0 -15px;
    align-items: center;
    font-size: 20px;
  }


  .desktop-form {
    position: absolute;
    top: 50%;
    right: 50px; 
    max-width: 500px;
    transform: translateY(-50%);
  }

  .mobile-form {
    display: none;
    height: 350px;
    max-width: 500px;
    h3{
    font-size: 16px;
    }
  }   

  @media (max-width: 1024px) {
  margin-bottom: 65px;
  nav {
    height: 50px;
  }

   .banner-heading-pc {
   display: none;
   }
   .banner-heading {
   display: block;
   }



  .logo {
    height: 45px;
  }

  .banner {
    height: 150px;
  }

  .desktop-form {
    display: none;
  }

  .mobile-form {
    display: block;
    padding: 15px;
    max-width: 500px;
    border-radius: 0px;
    margin-top: -5px;
  }

  .banner-heading {
  margin-left: 20rem;
    top: 45%;
    max-width: 170px;
    text-align: center;
    h1{
     font-size: 20px;
     margin-top: 20px;
    }
    p{
     font-size: 12px;
     margin-top: 2px;
    }
  }
}
`;

const Spinner = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;