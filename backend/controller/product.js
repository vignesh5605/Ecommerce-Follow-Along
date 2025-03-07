router.put('/cartproduct/quantity', async (req, res) => {
    const { email, productId, quantity } = req.body;
    // console.log("Updating cart product quantity");


    if (!email || !productId || quantity === undefined) {
        return res.status(400).json({ error: 'Email, productId, and quantity are required' });
    }


    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const cartProduct = user.cart.find(item => item.productId.toString() === productId);
        if (!cartProduct) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }


        cartProduct.quantity = quantity;
        await user.save();


        res.status(200).json({
            message: 'Cart product quantity updated successfully',
            cart: user.cart
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});
