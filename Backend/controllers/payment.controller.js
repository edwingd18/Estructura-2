import mercadopago from 'mercadopago';

export const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: 'TEST-7657111617572725-040210-4d168afb539a4921a02aa3649ea03e48-319035764'
    });

    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'COP',
                }
            ],
            back_urls: {
                success: 'https://github.com/mercadopago/checkout-payment-sample/tree/master/client/reactjs',
                failure: 'https://github.com/mercadopago/checkout-payment-sample/tree/master/client/reactjs',
                pending: 'https://github.com/mercadopago/checkout-payment-sample/tree/master/client/reactjs'
            },
            auto_return: "approved"
        };

        const preference = await mercadopago.preferences.create(body);

        res.json({
            preferenceId: preference.body.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al procesar el pago');
    }
}