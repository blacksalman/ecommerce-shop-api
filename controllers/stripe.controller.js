require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripePayment = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'gbp',
            payment_method: 'pm_card_visa',
        });
        if(!paymentIntent) {
            return res.status(400).json({message: "payment failed", status: false});
        }
        return res.status(201).send({message: "payment done successfull", paymentIntent, status: true});
    } catch (error) {
        res.status(500).send(error)
    }

}

module.exports = {
    stripePayment,
}