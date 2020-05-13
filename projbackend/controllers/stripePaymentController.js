const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuidv4 = require("uuid/v4");

exports.makePayment = (req, res) => {
  const data = JSON.parse(req.headers["stripe-signature"]);
  const { products, token } = data;
  let amount = 0;
  if (products) {
    amount = products.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);
  }

  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test acc",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
};
