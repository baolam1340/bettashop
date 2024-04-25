import {
  AiFillDashboard,
  AiOutlineShoppingCart,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { BsChat, BsCartDashFill } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaShippingFast, FaUserAstronaut } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { DashboardOutlined } from "@ant-design/icons";
import { CgDanger } from "react-icons/cg";
export const allNav = [
  {
    id: 1,
    title: "Trang chủ",
    icon: <DashboardOutlined />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Quản Lý Sản Phẩm",
    icon: <RiProductHuntLine />,
    role: "admin",
    path: "/admin/dashboard/products",
  },

  {
    id: 3,
    title: "Quản Lý Đơn Hàng",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },

  {
    id: 3,
    title: "Quản Lý Danh Mục Cá",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },

  {
    id: 18,
    title: "Chat Với Người Mua",
    icon: <BsChat />,
    role: "admin",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 35,
    title: "Danh Sách Người Dùng",
    icon: <HiUsers />,
    role: "admin",
    path: "/admin/dashboard/ds-customers",
  },
  {
    id: 37,
    title: "Thống Kê Rủi Ro",
    icon: <CgDanger />,
    role: "admin",
    path: "/admin/dashboard/ThongKeRuiRo",
  },
  {
    id: 12,
    title: "Thêm Sản Phẩm",
    icon: <AiOutlinePlus />,
    role: "nv_sanpham",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 13,
    title: "Tất Cả Sản Phẩm",
    icon: <RiProductHuntLine />,
    role: "nv_sanpham",
    path: "/seller/dashboard/products",
  },
  {
    id: 14,
    title: "Thêm Mã Khuyến Mãi",
    icon: <RiProductHuntLine />,
    role: "nv_sanpham",
    path: "/seller/dashboard/discount-products",
  },
  {
    id: 15,
    title: "Phiếu Nhập Hàng",
    icon: <MdProductionQuantityLimits />,
    role: "nv_nhapkho",
    path: "/seller/dashboard/log-product",
  },
  {
    id: 16,
    title: "Đơn Hàng",
    icon: <AiOutlineShoppingCart />,
    role: "nv_donhang",
    path: "/seller/dashboard/orders",
  },

  {
    id: 31,
    title: "Người Mua Trả Hàng",
    icon: <BsCartDashFill />,
    role: "nv_donhang",
    path: "/seller/dashboard/request",
  },
  {
    id: 18,
    title: "Chat Với Người Mua",
    icon: <BsChat />,
    role: "nv_quanly",
    path: "/seller/dashboard/chat-customer",
  },

  {
    id: 36,
    title: "Đánh Giá Đơn Hàng",
    icon: <BsCartDashFill />,
    role: "nv_donhang",
    path: "/admin/dashboard/all-review-order",
  },
  {
    id: 20,
    title: "Hồ Sơ",
    icon: <FiUsers />,
    role: "nv_donhang",
    path: "/seller/dashboard/profile",
  },
  {
    id: 20,
    title: "Hồ Sơ",
    icon: <FiUsers />,
    role: "nv_sanpham",
    path: "/seller/dashboard/profile",
  },
  {
    id: 20,
    title: "Hồ Sơ",
    icon: <FiUsers />,
    role: "nv_nhapkho",
    path: "/seller/dashboard/profile",
  },
  {
    id: 20,
    title: "Hồ Sơ",
    icon: <FiUsers />,
    role: "nv_quanly",
    path: "/seller/dashboard/profile",
  },
  {
    id: 21,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "nhanvien_admin",
    path: "/nhanvien-admin/dashboard",
  },
  {
    id: 23,
    title: "Thể Loại",
    icon: <BiCategory />,
    role: "nhanvien_admin",
    path: "/nhanvien-admin/dashboard/category",
  },
  {
    id: 24,
    title: "Người Bán",
    icon: <FiUsers />,
    role: "nhanvien_admin",
    path: "/nhanvien-admin/dashboard/sellers",
  },
  {
    id: 26,
    title: "Người Bán Chưa Kích Hoạt",
    icon: <FiUsers />,
    role: "nhanvien_admin",
    path: "/nhanvien-admin/dashboard/deactive-sellers",
  },

  {
    id: 27,
    title: "Yêu Cầu Người Bán",
    icon: <BiLoaderCircle />,
    role: "nhanvien_admin",
    path: "/nhanvien-admin/dashboard/sellers-request",
  },

  {
    id: 29,
    title: "Đơn Hàng",
    icon: <AiFillDashboard />,
    role: "shipper",
    path: "/shipper/dashboard",
  },
];
