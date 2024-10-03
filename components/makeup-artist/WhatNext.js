import styled from "styled-components";
import Image from "next/image";
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Heading from "../miscellaneous/Heading";

function WhatNext() {



    return (
        <Section className="howitwork-section">

            <div className="howitwork-container">

                <div className="details">
                    <Heading text={"What Next ?"} desc={"Make your makeup experience a breeze!"} />
                    <div className="how-it-work-items">
                        <div className="how-it-work-item">
                        <div className="icon">
                                <Image
                                    src={'/howitwork/1.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">Check out Makeup Artists </h2>
                                <p className="description">Shortlist & connect with those who match your requirements.</p>
                            </div>

                        </div>
                        <div className="how-it-work-item">
                            <div className="icon">
                                <Image
                                    src={'/howitwork/2.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">View contact details</h2>
                                <p className="description">Get Makeup Artist’s contact details to connect directly on call.</p>
                            </div>
                            <BsThreeDotsVertical className="dot" sizes={30} />

                        </div>
                        <div className="how-it-work-item">
                        <div className="icon">
                                <Image
                                    src={'/howitwork/3.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">Exclusive WeddingBanquets Manager</h2>
                                <p className="description">A dedicated Relationship Manager to help you finalise the right vendor.</p>
                            </div>
                            <BsThreeDotsVertical className="dot" sizes={30} />

                        </div>
                    <div className="how-it-work-item">
                        {/* <div className="icon">
                                <Image
                                    src={'/howitwork/4.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">BOOK VENDORS</h2>
                                <p className="description">Experience enriching wedding planning with our 100% trusted and verified vendors.</p>
                            </div>
                            <BsThreeDotsVertical className="dot" sizes={30} /> */}
                        </div>
                    </div>
                </div>
                <div className="img">
                    <Image
                        src="/howitwork/9.png"
                        alt="An example image"
                        fill={true}
                        sizes="(100vw)"
                    />
                </div>
            </div>

        </Section>
    )
}

export default WhatNext;




const Section = styled.section`

.img{
    position:relative;
    max-width: 70rem;
    height:600px;
}

.howitwork-container{
    display:grid;
    grid-template-columns:1fr 1fr;
    align-items: center;
}

.details{
    padding: 5rem 1rem;
}

.how-it-work-items{
    margin-top:4rem;
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 4rem;
    
    .how-it-work-item{
        position: relative;
        display: flex;
        justify-content: start;
        gap: 2rem;
        max-width:50rem;

        .title{
            font-size:2rem;
        }
        .description{
            font-family: "Poppins";
            font-size:1.5rem;
            color:var(--para);
        }

        .icon{
            position: relative;
            overflow: hidden;
            min-width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;

            &:first-child{
                color:white;
            }
        }
        .dot{
            font-size: 4rem;
            color:var(--primary-color);
            position: absolute;
            left:8px;
            top:-45px;
        }
    }
}

@media (max-width:900px) {
    .img{
    position:relative;
    height:450px;
}

.howitwork-container{
    grid-template-columns:1fr 1fr;
}

}
@media (max-width:700px) {

.img{
    display: none;
}
.details{
    padding: 4rem;

}
.howitwork-container{
    display:grid;
    grid-template-columns:1fr;
}
}

@media (max-width:600px) {
.details{
    padding: 2rem;
}
}

`