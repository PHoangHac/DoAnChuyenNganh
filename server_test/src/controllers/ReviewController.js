// import service
import db from "../models/index";

const ReviewController = {
  CreateReview: async (req, res) => {
    try {
      const data = req.body;
      const review = await db.Review.create({
        Comment: data.Comment,
        Rating: data.Rating,
        Status: data.Status,
        idUser: data.idUser,
        idTourInfo: data.idTourInfo,
      });
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllReview: async (req, res) => {
    try {
      const reviews = await db.Review.findAll({
        raw: true,
      });
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllReviewByTour: async (req, res) => {
    const { idTour } = req.params;
    try {
      const reviews = await db.Review.findAll({
        where: { idTourInfo: idTour },
        include: [
          { model: db.User, attributes: ["id", "name", "phone", "image"] },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetOneNewReview: async (req, res) => {
    const { idTour } = req.params;
    try {
      const reviews = await db.Review.findAll({
        where: { idTourInfo: idTour },
        include: [
          { model: db.User, attributes: ["id", "name", "phone", "image"] },
        ],
        // raw: true,
        order: [["id", "DESC"]],
      });
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  CheckUserReview: async (req, res) => {
    const data = req.body;
    try {
      const CantReview = await db.CantReview.create({
        Status: data.Status,
        idUser: data.idUser,
        idTourInfo: data.idTourInfo,
      });
      return res.status(200).json(CantReview);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetOneCheck: async (req, res) => {
    const { id } = req.params;
    try {
      const reviews = await db.CantReview.findOne({
        where: { id: id },
        include: [
          { model: db.User, attributes: ["id", "name", "phone"] },
          {
            model: db.TourInfo,
            attributes: ["id", "NameTour"],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  StopUserReview: async (req, res) => {
    const { id } = req.params;
    try {
      const reviews = await db.CantReview.findOne({
        where: { id: id },
      });
      if (reviews) {
        reviews.Status = req.body.Status;
        await reviews.save();
        return res.status(200).json(reviews);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default ReviewController;
