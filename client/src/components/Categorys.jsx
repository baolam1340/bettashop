/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };
  return (
    <div className="row relative">
      {categorys.map((c, i) => (
        <div className="col-md-2  " key={i}>
          <Card
            hoverable
            style={{ width: 150 }}
            cover={<img src={c.image} alt="image" />}
            className="bg-light"
          >
            <Card.Meta
              title={
                c.name.length > 10 ? ( // Kiểm tra độ dài của tên - ví dụ 10 ký tự
                  <span style={{ display: "block", whiteSpace: "normal" }}>
                    {c.name}
                  </span>
                ) : (
                  c.name
                )
              }
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Categorys;
