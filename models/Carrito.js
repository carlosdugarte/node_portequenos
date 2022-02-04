const fs = require('fs/promises');
const { resolve } = require('path');

var Productos = require('../models/Productos');
const productos = new Productos('./data/productos.txt');

const filePath = './data/';
const fileName = 'carts.txt'


class Carrito {
    async getFileData() { //OK
        try {
            const data = await fs.readFile(`${filePath}${fileName}`, 'utf-8');
            return JSON.parse(data);
        } catch(error) {
            console.error('getFileData() error:', error.message);
            return error;
        }
    }
    async saveFileData(data) { //OK
        try {   
            await fs.writeFile(`${filePath}${fileName}`, JSON.stringify(data, null, 2));
            return data;
        } catch(error) {
            console.error('saveFileData() error:', error.message);
            return error;
        }
    }
    async createCart() { //OK
        const data = await this.getFileData();
        const timestamp = Date.now();

        console.log(data);
        const newId = data[data.length - 1].id + 1;

        const cart = { id: newId, timestamp, productos: [] };
        data.push(cart);
        await this.saveFileData(data);
        return cart.id;
    }

    async deleteCart(id) { //OK
        const data = await this.getFileData();
        const index = data.findIndex(cart => cart.id === parseInt(id));
        if (index < 0) return { error: `Carrito con id ${id} no encontrado` };
        data.splice(index, 1);
        return await this.saveFileData(data);
    }

    async getCart(id) {         //OK
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(id));
        if (cart) return cart;
        return {error: `Carrito con id ${id} no encontrado`};
    }

    async addProduct(cartId, productId) {
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Carrito con id ${cartId} no encontrado` }

        const product = await productos.getById(productId);

        if (product.error) return { error: `Producto con id ${productId} no encontrado` }
        
        cart.productos.push(product);

        await this.saveFileData(data);

        return cart;
    }

    async removeProduct(cartId, productId) {
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Carrito con id ${cartId} no encontrado` };
        const productIndex = cart.productos.findIndex(product => product.id === parseInt(productId));
        cart.productos.splice(productIndex, 1);
        await this.saveFileData(data);
        return cart;
    }
}
module.exports = Carrito;