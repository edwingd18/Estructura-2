import { MercadoPagoConfig, Preference } from "mercadopago"

export const createOrder = async (req, res) => {

    const client = new MercadoPagoConfig({
        accessToken: 'TEST-7657111617572725-040210-4d168afb539a4921a02aa3649ea03e48-319035764'
    });

    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'COP',
                    // description: 'Sala: Sala 1',
                    // picture_url: 'https://www.example.com/image.jpg',
                    // id: 'silla1',
                    // category_id: 'general',
                }
            ],
            back_urls: {
                success: 'https://github.com/mercadopago/checkout-payment-sample/tree/master/client/reactjs',
                failure: 'https://github.com/mercadopago/checkout-payment-sample/tree/master/client/reactjs',
                pending: 'https://github.com/mercadopago/checkout-payment-sample/tree/master/client/reactjs'
            },
            auto_return: "approved"
        };

        const preference = new Preference(client)
        const result = await preference.create({ body })

        res.json({
            preference: result.id
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Hubo un error al procesar el pago'
        });
    }
}