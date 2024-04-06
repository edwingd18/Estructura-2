export const createOrder = async (req, res) => {
    try {
        let preference = {
            items: [
                {
                    title: 'Numero de silla',
                    quantity: 1, // Aquí puedes poner el número de sillas
                    unit_price: 100, // Aquí puedes poner el valor a pagar
                    description: 'Sala: Sala 1', // Aquí puedes poner la sala
                    picture_url: 'https://www.example.com/image.jpg', // Aquí puedes poner una imagen de la silla
                    id: 'silla1', // Aquí puedes poner un identificador único para la silla
                    category_id: 'general', // Aquí puedes poner una categoría para la silla
                    currency_id: 'COP', // Aquí puedes poner la moneda en la que se va a realizar el pago
                }
            ],
            payer: {
                email: 'comprador@example.com', // Aquí puedes poner el correo del comprador
            }
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.redirect(response.body.init_point);
            }).catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al procesar el pago');
    }
}