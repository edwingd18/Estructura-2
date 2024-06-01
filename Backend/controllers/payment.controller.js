import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: "TEST-460293810791290-052823-54c80bf81e6d2d7c61bb60701acc6d3e-1686118927",
})

export async function createPreference(req, res) {
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
                success: 'http://localhost:5173/Resumen',
                failure: 'http://localhost:5173/infoPage',
                pending: 'http://localhost:5173/infoPage',
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