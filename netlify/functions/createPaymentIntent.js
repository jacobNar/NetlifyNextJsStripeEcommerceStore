import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const calculateOrderAmount = async (items, baseUrl) => {
    var resp = await fetch(`http://localhost:8888/.netlify/functions/getPrices`)
    var prices = await resp.json()
    var pricesDict = {};
    
    for (let i = 0; i < prices.length; i++){
        pricesDict[prices[i].id] = prices[i].unit_amount
    }
    
    var total = 0;

    for (let i = 0; i < items.length; i++){
        total += pricesDict[items[i].default_price]
    }
    return total;
};

exports.handler = async (event) => {

    const site = event.headers["host"];

    var baseUrl = ""
    if(site == "localhost:8888"){
      baseUrl = "http://localhost:8888"
    }else {
      baseUrl = "https://sabaitea.netlify.app/"
    }


    try{
        var data = JSON.parse(event.body)
        var amount = await calculateOrderAmount([{"id":"prod_J0cQmPIRpHNvmJ","object":"product","active":true,"attributes":[],"created":1614226279,"default_price":"price_1IObC8G706NbNZFJGQExG8XU","description":"test 3","features":[],"images":["https://files.stripe.com/links/MDB8YWNjdF8xSUJNNUJHNzA2TmJOWkZKfGZsX3Rlc3RfUlFCeHM5V0U5bGxiZklrZ0ZpWXVRMlhq00ElLsjX5L"],"livemode":false,"metadata":{},"name":"test 3","package_dimensions":null,"shippable":null,"statement_descriptor":null,"tax_code":null,"type":"service","unit_label":null,"updated":1652285038,"url":null}], baseUrl)
        console.log(amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
              enabled: true,
            },
          });

        console.log(paymentIntent)
        return {
            statusCode: 200,
            body: JSON.stringify({clientSecret: paymentIntent.client_secret})
        }

    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}
