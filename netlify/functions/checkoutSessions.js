import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


exports.handler = async (event) => {

  const site = event.headers["host"];
  const origin = event.headers['origin'];
  const items = JSON.parse(event.body);
  console.log(items)
  var baseUrl = "";
  if(site == "localhost:8888"){
    baseUrl = "http://localhost:8888";
  }else {
    baseUrl = "https://sabaitea.netlify.app/";
  }


  try{
      const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: items.cart,
          mode: 'payment',
          return_url: `${baseUrl}/confirm?session_id={CHECKOUT_SESSION_ID}`,
      });

      return {
          statusCode: 200,
          body: JSON.stringify({clientSecret: session.client_secret})
      }

  }catch(err){
      return {
          statusCode: 500,
          body: JSON.stringify(err)
      }
  }
}
