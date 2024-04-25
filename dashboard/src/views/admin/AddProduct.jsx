import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import { add_product, messageClear } from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  const optionsSizes = [{ value: "Trưởng Thành (3-6 cm) " }];

  const optionsSex = [
    { value: "1", label: "Đực" },
    { value: "2", label: "Cái" },
  ];

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, [dispatch]);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(categorys);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedOptionSex, setSelectedOptionSex] = useState(null);

  let onSelectSizes = (size) => {
    const propertyValues = Object.entries(size);
    setSelectedSize(propertyValues);
  };

  let onRemoveSizes = (size) => {
    const propertyValues = Object.entries(size);
    setSelectedSize(propertyValues);
  };

  const arraySizes = [];
  for (let i = 0; i < selectedSize.length; i++) {
    let sizes = selectedSize[i];
    for (let j = 0; j < sizes.length; j++) {
      if (sizes[j].value !== undefined) {
        arraySizes.push(sizes[j].value.split(","));
      }
    }
  }

  const arraySize = [];
  for (let i = 0; i < arraySizes.length; i++) {
    let a = arraySizes[i];
    for (let j = 0; j < a.length; j++) {
      arraySize.push(a[j]);
    }
  }

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    sex: "",
    color: "",
    size: [],
    stock: "",
    shopName: "Betta Shop",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  const [cateShow, setCateShow] = useState(false);

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

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
  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        sex: "",
        color: "",
        size: [],
        price: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
    }
  }, [successMessage, errorMessage, dispatch]);

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (
      state.name &&
      state.description &&
      state.price &&
      state.stock &&
      selectedOptionSex?.label &&
      state.color &&
      state.size &&
      state.discount
    ) {
      formData.append("name", state.name);
      formData.append("description", state.description);
      formData.append("price", state.price);
      formData.append("stock", state.stock);
      formData.append("sex", selectedOptionSex?.label);
      formData.append("color", state.color);
      formData.append("size", arraySize);
      formData.append("category", category);
      formData.append("discount", state.discount);
      formData.append("shopName", state.shopName);
    } else {
      toast.error("Cần điền đầy đủ trước khi thêm sản phẩm!");
      return;
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(add_product(formData));
  };

  const rollback = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="text-white cursor-pointer uppercase">
          <p
            onClick={rollback}
            className="p-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300"
          >
            Quay Lại
          </p>
        </div>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">
            Thêm Sản Phẩm
          </h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/admin/dashboard/products"
          >
            Tất Cả Sản Phẩm
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Tên Cá</label>
                <input
                  className="px-4 py-3 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  name="name"
                  id="name"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Chọn Loại Cá</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                  onClick={() => setCateShow(!cateShow)}
                  type="text"
                  placeholder="---chọn danh mục---"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="tìm kiếm"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start z-9999 items-start flex-col h-[120px] overflow-x-scroll">
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categorys);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Số Lượng</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="number"
                  min="0"
                  placeholder="Nhập số lượng sản phẩm"
                  name="stock"
                  id="stock"
                  onChange={inputHandle}
                  value={state.stock}
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Giá</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="number"
                  placeholder="nhập giá sản phẩm"
                  name="price"
                  id="price"
                  onChange={inputHandle}
                  value={state.price}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Giảm giá</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="number"
                  placeholder="Nhập % số lượng muốn giảm..."
                  name="discount"
                  id="discount"
                  onChange={inputHandle}
                  value={state.discount}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="color">Nhập màu sản phẩm</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  type="text"
                  placeholder="Nhập màu sản phẩm..."
                  name="color"
                  id="color"
                  onChange={inputHandle}
                  value={state.color}
                />
              </div>
              <div className="flex flex-col w-full gap-1 ">
                <label htmlFor="color">Chọn kích thước cá</label>

                <Multiselect
                  className="text-slate-500"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "#283046",
                      primary: "black",
                    },
                  })}
                  placeholder="Chọn size"
                  options={optionsSizes}
                  onSelect={onSelectSizes}
                  onRemove={onRemoveSizes}
                  displayValue="value"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
              <label htmlFor="sex">Chọn Giống Cá</label>

              <Select
                className="text-slate-500 bg-green-500"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#283046",
                    primary: "black",
                  },
                })}
                placeholder="Chọn giống"
                defaultValue={selectedOptionSex}
                onChange={setSelectedOptionSex}
                options={optionsSex}
                displayValue="value"
              />
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Giới Thiệu</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                placeholder="Nhập chi tiết giới thiệu sản phẩm..."
                name="description"
                id="description"
                onChange={inputHandle}
                value={state.description}
              ></textarea>
              {/* <ReactQuill
                className="px-4 py-2 bg-white focus:border-indigo-500 outline-none mb-4 rounded-md text-black"
                theme="snow"
                rows={4}
                name="description"
                id="description"
                value={state.description}
                onChange={inputHandle_description}
              /> */}
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow.map((img, i) => (
                <div className="h-[180px] relative">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
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
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>Chọn hình ảnh (2 hình ảnh trở lên)</span>
              </label>
              <input
                multiple
                onChange={inmageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Thêm Sản Phẩm"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
