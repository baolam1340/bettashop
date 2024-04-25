//Các reducers đã được import từ các module tương ứng.
//Mỗi reducer được gán cho một key trong object rootReducers.
//Mục tiêu của việc kết hợp này có thể là để tạo một store Redux chứa tất cả các reducers 
//đã được combine lại với nhau, để quản lý trạng thái của ứng dụng một cách hiệu quả.
import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import chatReducer from "./reducers/ChatReducer";

const rootReducers = {
  home: homeReducer,
  auth: authReducer,
  card: cardReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
};
export default rootReducers;
