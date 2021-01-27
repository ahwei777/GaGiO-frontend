import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import courseReducer from "./reducers/courseReducer";
import teacherReducer from "./reducers/teacherReducer";
import userReducer from "./reducers/userReducer";
import memberReducer from "./reducers/memberReducer";
import unitReducer from "./reducers/unitReducer";
import orderReducer from "./reducers/orderReducer";
import errorMessageReducer from "./reducers/errorMessageReducer"

export default configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    course: courseReducer,
    teacher: teacherReducer,
    user: userReducer,
    member: memberReducer,
    unit: unitReducer,
    errorMessage: errorMessageReducer,
  },
});
