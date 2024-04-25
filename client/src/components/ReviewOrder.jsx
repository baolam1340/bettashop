import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import RatingReact from "react-rating";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import {
  customer_review_order,
  messageClear,
} from "../store/reducers/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";
const ReviewOrder = ({ order }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageShow, setImageShow] = useState([]);

  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.home
  );

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };
  const inmageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideos(e.target.files);
    setVideoPreview(URL.createObjectURL(file));
  };
  const [rat, setRat] = useState();

  const { userInfo } = useSelector((state) => state.auth);

  const [re, setRe] = useState();

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  const review_order_submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", userInfo.name);
    formData.append("review", re);
    formData.append("rating", rat);
    formData.append("orderId", order._id);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", videos[i]);
    }

    dispatch(customer_review_order(formData));
  };

  return (
    <div className="mt-8">
      <div>
        {loader ? (
          <FadeLoader />
        ) : (
          <div className="flex flex-col gap-3">
            <b className="text-black">
              chọn số sao đánh giá <b className="text-red-500">*</b>
            </b>
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDBB0E] text-4xl">
                    <AiFillStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={review_order_submit}>
              <b className="text-black">
                Để lại bình luận đánh giá <b className="text-red-500">*</b>
              </b>
              <textarea
                value={re}
                required
                onChange={(e) => setRe(e.target.value)}
                className="border outline-0 p-3 w-full"
                name=""
                id=""
                cols="50"
                rows="5"
              ></textarea>

              <div>
                <div className="gap-3 w-full text-[#d0d2d6] mb-4 md:w-[200px]">
                  {imageShow.map((img, i) => (
                    <div className="h-[180px] relative">
                      <label htmlFor={i}>
                        <img
                          className="w-full h-full rounded-sm"
                          src={img.url}
                          alt=""
                          required
                        />
                      </label>
                      <input
                        onChange={(e) => changeImage(e.target.files[0], i)}
                        type="file"
                        id={i}
                        className="hidden"
                      />
                      <span
                        onClick={() => removeImage(i)}
                        className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                      >
                        <IoCloseSharp />
                      </span>
                    </div>
                  ))}
                  <b className="text-black">
                    Chọn hình ảnh để gửi đánh giá : (chọn 1 hoặc hơn)
                  </b>
                  <label
                    className="flex justify-center items-center flex-col w-[200px] h-[150px] cursor-pointer border border-dashed hover:border-indigo-500 text-[#d0d2d6]"
                    htmlFor="image"
                  >
                    <span>
                      <BsImages />
                    </span>
                    <span>Chọn hình ảnh</span>
                  </label>
                  <input
                    multiple
                    onChange={inmageHandle}
                    className="hidden"
                    type="file"
                    id="image"
                    required
                  />
                </div>
                <b className="text-black">
                  Chọn video để gửi đánh giá: (chọn 1 hoặc hơn)
                </b>
                <label
                  className="flex justify-center items-center flex-col w-[200px] h-[150px] cursor-pointer border border-dashed hover:border-indigo-500 text-[#d0d2d6]"
                  htmlFor="video"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>video</span>
                </label>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleVideoChange}
                  accept="video/*"
                  id="video"
                  required
                />

                {videoPreview && <video src={videoPreview} controls />}
              </div>
              <div>
                <button className="py-1 justify-center items-center px-5 mt-4 bg-indigo-500 text-white rounded-sm mb-2">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewOrder;
