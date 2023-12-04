import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {

    try{
        const {data: prices} = await stripe.prices.list({
            limit: 100,
        });

        return {
            statusCode: 200,
            body: JSON.stringify(prices)
        }
    }catch(error){
        
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
    
}
