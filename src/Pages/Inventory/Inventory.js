import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Inventory.css'

const Inventory = () => {

    const [inventory, setInventory] = useState([]);
    // const [quantity, setQuantity] = useState(0);
    const [reload, setIsReload] = useState(true);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const url = `https://fast-escarpment-66103.herokuapp.com/inventory/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [reload])

    const handleDelivered = () => {
        const previousQuantity = inventory.quantity;
        const newQuantity = previousQuantity - 1;
        const updatedQuantity ={newQuantity} ;
        

        // send data to the server
        const url = `https://fast-escarpment-66103.herokuapp.com/inventory/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedQuantity)
        })
            .then(res => res.json())
            .then(data => {
                setIsReload(!reload)
                alert('Single unit delivered successfully!!!');
            })
    };

    const handleRestockItems = (event) => {
        event.preventDefault();
        const previousQuantity = inventory.quantity;
        const newStockQuantity =parseInt(event.target.restock.value) ;
        const newQuantity = previousQuantity + newStockQuantity;
        const updatedQuantity ={newQuantity} ;
        event.target.reset();

        // send data to the server
        const url = `https://fast-escarpment-66103.herokuapp.com/inventory/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedQuantity)
        })
            .then(res => res.json())
            .then(data => {
                setIsReload(!reload)
                console.log('success', data);
                alert('Stock updated successfully!!!');
            })
    };


    return (
        <div className="single-inventory">
            <form action="" onSubmit={handleRestockItems} >
                <input type="number" name="restock" id="restock" placeholder='Input Received' required className="me-2 px-2 py-1"/>
                <input type="submit" value="Stock Items"  className="restock-button bg-primary text-white px-3 py-2 rounded "/>

            </form>
            <div className='inventory-card d-flex my-5'>
                <div className="car-img">
                    <img src={inventory.img} alt="" />
                </div>
                <div className="car-details text-start p-3">
                    <h3>{inventory.name}</h3>
                    <p>{inventory.description}</p>
                    <h5 className='fs-4'>Price: ${inventory.price}</h5>
                    <h6><small> Supplier: </small>{inventory.supplier}</h6>
                    <h6> <small> Available in Stock: </small> {inventory.quantity}</h6>
                    <button className='my-2 px-2 rounded'  onClick={() => handleDelivered()} >Delivered</button>
                </div>
            </div>
        </div>
    );
};

export default Inventory;