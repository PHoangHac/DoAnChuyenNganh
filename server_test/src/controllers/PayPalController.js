// import service
import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AZAOI_MOCJiD_nI0YnQ-4knNWAizfuCkIPfLlD8xeq3MmQSFLJ6R9nFOrC5mJFEd_Mm6_3SWql68wdF5",
  client_secret:
    "EK--oBhD3Zvz4FURSnS2NISIR-rX_AG2SDhnnMQLbhm1JPY16_PJr1_NtZ0ToiF3BRp0E1tXSSPn8sE2",
});

const PayPal = {
  ChooseMethod: async (req, res) => {
    try {
      return res.render("PayPal.ejs");
      //   return res.status(200).json({ msg: "success !" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  Payment: async (req, res) => {
    try {
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://192.168.1.8:9090/PayPal/success",
          cancel_url: "http://192.168.1.8:9090/PayPal/cancel",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "item",
                  sku: "item",
                  price: "1.00",
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: "1.00",
            },
            description: "This is the payment description.",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          console.log("Create Payment Response");
          console.log(payment.transactions);
          res.redirect(payment.links[1].href);
        }
      });
      //   return res.status(200).json({ msg: "success !" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  PaymentSuccess: async (req, res) => {
    try {
      const PayerID = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const execute_payment_json = {
        payer_id: PayerID,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: "1.00",
            },
          },
        ],
      };

      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("SuccessPayment.ejs");
          }
        }
      );
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  PaymentCancel: async (req, res) => {
    try {
      res.render("CancelPayment.ejs");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default PayPal;
