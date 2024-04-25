//cho phép mỗi lát trạng thái được quản lý bằng bộ giảm tốc tương ứng và tạo điều kiện quản lý trạng thái
// tổng thể dễ dàng hơn trong ứng dụng Redux.
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";
import chatReducer from "./Reducers/chatReducer";
import OrderReducer from "./Reducers/OrderReducer";
import PaymentReducer from "./Reducers/PaymentReducer";
import dashboardIndexReducer from "./Reducers/dashboardIndexReducer";
import shipperReducer from "./Reducers/shipperReducer";
const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: OrderReducer,
  payment: PaymentReducer,
  dashboardIndex: dashboardIndexReducer,
  shipper: shipperReducer,
};

export default rootReducer;
