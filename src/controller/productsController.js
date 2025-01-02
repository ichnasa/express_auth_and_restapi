// * THIS FILE HANDLE HTTP METHOD
import { v4 as uuidv4 } from 'uuid';

const getProducts = async (req, res) => {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    res.status(200).json(data)
}

const getProductById = async (req, res) => {
    const response = await fetch(`${process.env.API_URL}/${parseInt(req.params.id)}`)
    const data = await response.json();
    res.status(200).json(data);
}

const addProduct = async (req, res) => {
    const { name, quantity, description } = req.body;

    if (name && quantity && description) {
        await fetch(process.env.API_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: uuidv4,
                name: name,
                quantity: quantity,
                description: description
            })
        });

        res.status(201).send({
            msg: "Add product success"
        })
    } else {
        res.status(201).send({
            msg: "Data invalid"
        })
    }
}

const deleteProduct = async (req, res) => {
    const productIdToDelete = req.params.id

    await fetch(`${process.env.API_URL}/${productIdToDelete}`, {
        method: 'DELETE'
    })
    res.status(200).json({
        msg: "Product deleted"
    })
}

const updateProduct = async (req, res) => {
    const productIdToUpdate = String(req.params.id)
    const payload = req.body
    await fetch(`${process.env.API_URL}/${productIdToUpdate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    res.status(200).json({
        msg: `Product with id:${productIdToUpdate} is succesfully updated`
    })
}

export { getProducts, getProductById, addProduct, deleteProduct, updateProduct }