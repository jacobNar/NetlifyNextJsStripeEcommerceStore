import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
    try{
        var {data} = await stripe.products.list()

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }

    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}
