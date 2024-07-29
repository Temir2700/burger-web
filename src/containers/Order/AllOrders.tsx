import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IOrderData } from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const AllOrders = () => {
    const [orders, setOrders] = useState<IOrderData[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosApi.get('/orders.json');
            const ordersArray: IOrderData[] = Object.values(response.data); 
            console.log(ordersArray);
            setOrders(ordersArray);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="mt-4">
          {loading ? (
            <div className="text-center">
                <Spinner /> 
            </div>               
            ) : orders.length === 0 ? (
                <p className="fs-3 text-white">No orders found!</p>
            ) : (
                <table className="table table-dark table-striped table-hover ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={idx}>
                                <td>{order.customer.name}</td>
                                <td>{order.customer.address}</td>
                                <td>{order.customer.phone}</td>
                                <td>
                                    <ul className="list-unstyled">
                                        {order.dishes.map((dish, dishIdx) => (
                                            <li key={dishIdx} className="mb-2">
                                                <div>
                                                    <strong>{dish.dish.name}</strong>
                                                    <p className="mb-1">{dish.dish.description}</p>
                                                    <p className="mb-1">Amount: {dish.amount}</p>
                                                    <p className="mb-1">Price: {dish.dish.price} KGS</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
        </div>
    )
};

export default AllOrders;