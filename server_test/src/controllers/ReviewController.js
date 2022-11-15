// import service
import db from "../models/index";

const ReviewController = {
  //   CreateLocation: async (req, res) => {
  //     let data = req.body;
  //     // console.log(data);
  //     let locationData = await LocationService.CreateLocation(data);
  //     return res.status(200).json({
  //       errCode: locationData.errCode,
  //       message: locationData.errMessage,
  //       message: locationData.location,
  //     });
  //   },
  GetAllReview: async (req, res) => {
    try {
      const data = await db.ReviewTour.findAll();
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

export default ReviewController;
