import db from "../models/index";

const BookingService = {
  CreateBooking: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const bookingData = {};

        // validate
        if (!data.Adult == "" || !data.Children == "") {
          let booking = await db.Booking.create({
            Adult: data.Adult,
            Children: data.Children,
            AdultTotalCost: data.AdultTotalCost,
            ChildrenTotalCost: data.ChildrenTotalCost,
            StartedDay: data.StartedDay,
            totalCost: data.totalCost,
            totalGuest: data.totalGuest,
            Status: data.Status,
            idUser: data.idUser,
            idTourInfo: data.idTourInfo,
          });
          bookingData.errCode = 0;
          bookingData.errMessage = "Create booking successfully !";
          bookingData.booking = booking;
        } else {
          bookingData.errCode = 1;
          bookingData.errMessage = "Some Field is empty !";
        }

        resolve(bookingData);
      } catch (e) {
        reject(e);
      }
    });
  },
  GetAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let allBooking = db.Booking.findAll({
          raw: true,
        });
        resolve(allBooking);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default BookingService;
