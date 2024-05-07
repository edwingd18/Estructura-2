import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: "TEST-3087996574051523-050621-045a009784e5e20aeabed9dbb753356a-1686118927",
})

export default async function createPreference(req, res) {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.total),
                    currency_id: 'COP',
                },
            ],
            back_urls: {
                success: 'http://localhost:3000/@onthecode',
                failure: 'http://localhost:3000/@onthecode',
                pending: 'http://localhost:3000/@onthecode',
            },
            auto_return: 'approved',
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({
            id: result.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al cargar la preferencia de pago :('
        });
    }
}
