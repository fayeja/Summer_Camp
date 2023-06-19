import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="text-center">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
        className="custom-carousel"
      >
        <div>
          <img
            src="https://img.freepik.com/free-photo/kids-playing-football-supervised-by-football-trainer_23-2149684402.jpg?w=1800&t=st=1686089165~exp=1686089765~hmac=cd695c697fdd55d6d4b7ae3580464ca7225d67e13c609d49a0674e0e15e4dc69"
            alt="Football"
          />
          <div className="legend">
            <h3>Football</h3>
            <p className="description">
              Kids playing football supervised by a trainer
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-photo/low-angle-kids-sportswear-looking-down_23-2148631518.jpg?w=1800&t=st=1686086034~exp=1686086634~hmac=cbc62253809956fec265911e4662971993b52d4045a96124c4fa6ddf1dcd5985"
            alt="Sportswear"
          />
          <div className="legend">
            <h3>Sportswear</h3>
            <p className="description">Kids in sportswear looking down</p>
          </div>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-photo/field-hockey-players-during-tournament-game_23-2149668609.jpg?w=1800&t=st=1686086571~exp=1686087171~hmac=0afd5ebe0e8920132c54ae20ff619e6fc768ace43830aa7a46899494fefd4e18"
            alt="Field Hockey"
          />
          <div className="legend">
            <h3>Field Hockey</h3>
            <p className="description">
              Players during a field hockey tournament game
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
