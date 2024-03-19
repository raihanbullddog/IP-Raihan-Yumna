const { Transaction, User } = require("../models");
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

module.exports = class GlobalController {
  static async registerUser(req, res, next) {
    try {
      const data = req.body;
      const { username, email, password } = data;
        let createUser = await User.create({
          username,
          email,
          password,
        });
        let newUser = {
          id: createUser.id,
          username: createUser.username,
          email: createUser.email,
        };
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async processTransaction(req, res, next) {
    try {
      const UserId = req.user.id;
      const {
        product_data_name,
        product_data_unit_amount,
        product_data_currency,
        product_data_quantity,
      } = req.body;

      const findUser = await User.findByPk(UserId, {
        include: [Transaction],
      });

      const now = new Date();
      const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
      // const trxId = nanoid();
      const transaction_id = `TRX-UACC-warg48-${formattedDate}`;
      if (!findUser) throw { name: "notFound" };
      // console.log(findUser.Transactions[0], "ENIH");

      if (findUser.status === "Premium")
        throw { name: "isPremium", message: "your tier is already Premium" };

      if (findUser.Transactions.length > 0) {
        const checkSession = await stripe.checkout.sessions.retrieve(
          findUser.Transactions[0].payment_gateway_id
        );

        if (checkSession.status === "open") {
          res.status(200).json({ url: checkSession.url });
        } else if (checkSession.status === "expired") {
          res.status(200).json({
           message: "Your transaction is expired"
          });
        } else if (checkSession.status === "complete") {
          await findUser.update({ status: "Premium" });
          await findUser.Transactions[0].update({ status: "paid" });
          res.status(200).json({
            message: "Payment successful, redirecting to your page",
            url: "https://clientraihan.web.app",
          });
        }
      } else {
        const session = await stripe.checkout.sessions.create({
          success_url: "https://clientraihan.web.app/success",
          cancel_url: "https://clientraihan.web.app/fail",
          line_items: [
            {
              price_data: {
                currency: product_data_currency,
                product_data: {
                  name: product_data_name,
                },
                unit_amount: product_data_unit_amount,
              },
              quantity: product_data_quantity,
            },
          ],
          mode: "payment",
          customer_email: findUser.email,
        });

        const payment_gateway_id = session.id;

        await Transaction.create({
          UserId,
          transaction_id,
          payment_gateway_id,
          status: `${session.payment_status}`,
        });

        // res.status(200).json({ session });
        res.status(200).json({ url: session.url });
      }
    } catch (error) {
        next(error)
    }
  }
  static async upgradeToPremium (req, res, next) {
    try {
        const UserId = req.user.id;
      const findUser = await User.findByPk(UserId, {
        include: [Transaction],
      });

      if (!findUser)
        throw {
          name: "Unauthorized",
          message: "You are not authorized to upgrade",
        };

      if (findUser.status === "Premium")
        throw { name: "isPremium", message: "your tier is already Premium" };

      if (findUser.Transactions[0].status === "unpaid") {
        const checkSession = await stripe.checkout.sessions.retrieve(
          findUser.Transactions[0].payment_gateway_id
        );

        if (checkSession.status === "open") {
          res.status(200).json({ url: checkSession.url });
        } else if (checkSession.status === "expired") {
          res.status(200).json({
           message: "Your transaction has expired"
          });
        } else if (checkSession.status === "complete") {
          await findUser.update({ status: "Premium" });
          await findUser.Transactions[0].update({ status: "paid" });
          res.status(200).json({
            message: "Payment Successful, redirecting to your page",
          });
        }
      } else {
        await findUser.update({ status: "Premium" });
        await findUser.Transactions[0].update({ status: "paid" });
        res
          .status(200)
          .json({ message: "Upgrade success, you are now a Premium user" });
      }
    } catch (error) {
        next(error)
    }
  }
};
