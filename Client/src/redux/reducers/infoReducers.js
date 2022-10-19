// KHỎI TẠO CÁC ACTION
export const CAP_NHAT_EMAIL = 'CAP_NHAT_EMAIL';
export const CAP_NHAT_ID = 'CAP_NHAT_ID';

// KHỞI TẠO CÁC TRANG THÁI
const initialState = {
  email: '',
  score: 0,
  address: '',
  id: '',
};

// KHỞI TẠO HÀM CÓ 2 THAM SỐ .1 TRẠNG THÁI BAN ĐẦU .2 payload - CẬP NHẬP LẠI THÔNG TIN TRẠNG THÁI TRƯỚC
export default function actionReducers(state = initialState, payload) {
  switch (payload.type) {
    //KHI GỌI HÀNH ĐỘNG CẬP NHẬT EMAIL
    case CAP_NHAT_EMAIL:
      // TRẢ VỀ
      return {
        // GIỮ NGUYÊN TRẠNG THÁI INITIAL
        ...state,
        // THAY ĐỔI TRƯỜNG DỮ LIỆU EMAIL
        email: payload.email,
      };
    case CAP_NHAT_ID:
      return {
        ...state,
        id: payload.id,
      };
    default:
      return state;
  }
}
