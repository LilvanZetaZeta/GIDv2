import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/orderApi';
import { getAllUsers, updateUserRole } from '../services/userApi';
import { AdminProductPage } from './AdminProductPage'; // 
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import toast from 'react-hot-toast';
import '../styles/pages/AdminDashboardPage.css';
import { getProducts, deleteProduct } from '../services/productApi';
import { Image } from '../components/atoms/Image';


export const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('products');
    
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]); // Lista de productos
  
    // Estados para controlar el formulario de producto
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
  
    const [loading, setLoading] = useState(false);
  
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'orders') {
            const res = await getAllOrders();
            setOrders(res.data);
        }
        if (activeTab === 'users') {
            const res = await getAllUsers();
            setUsers(res.data);
        }
        if (activeTab === 'products') {
            const res = await getProducts();
            setProducts(Array.isArray(res.data) ? res.data : []);
        }
      } catch(e) {
        toast.error("Error cargando datos");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => { loadData(); }, [activeTab]);
  
    // --- GESTIÓN DE PRODUCTOS ---
  
    const handleCreateClick = () => {
        setProductToEdit(null);
        setIsProductFormOpen(true);
    };
  
    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsProductFormOpen(true);
    };
  
    const handleDeleteClick = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
        try {
            await deleteProduct(id);
            toast.success("Producto eliminado");
            loadData();
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };
  
    const handleFormSuccess = () => {
        setIsProductFormOpen(false);
        setProductToEdit(null);
        loadData(); // Recargar la lista
    };
  
    const handleFormCancel = () => {
        setIsProductFormOpen(false);
        setProductToEdit(null);
    };
  
    // --- GESTIÓN DE ÓRDENES Y USUARIOS (Igual que antes) ---
    const handleStatusChange = async (id, s) => { await updateOrderStatus(id, s); toast.success('Estado actualizado'); loadData(); };
    const handleRoleChange = async (id, r) => { await updateUserRole(id, r); toast.success('Rol actualizado'); loadData(); };
  
    return (
      <div className="container">
        <Typography variant="h1" className="text-center">Panel de Administración</Typography>
        
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem'}}>
          <Button onClick={() => {setActiveTab('products'); setIsProductFormOpen(false)}} variant={activeTab === 'products' ? 'primary' : 'secondary'} className="button--auto-width">Productos</Button>
          <Button onClick={() => setActiveTab('orders')} variant={activeTab === 'orders' ? 'primary' : 'secondary'} className="button--auto-width">Órdenes</Button>
          <Button onClick={() => setActiveTab('users')} variant={activeTab === 'users' ? 'primary' : 'secondary'} className="button--auto-width">Usuarios</Button>
        </div>
  
        {/* --- PESTAÑA PRODUCTOS --- */}
        {activeTab === 'products' && (
          <div>
              {isProductFormOpen ? (
                  <AdminProductPage 
                      productToEdit={productToEdit} 
                      onSuccess={handleFormSuccess} 
                      onCancel={handleFormCancel}
                  />
              ) : (
                  <div className="table-container">
                      <div style={{padding: '1rem', textAlign: 'right'}}>
                          <Button onClick={handleCreateClick} className="button--auto-width">+ Nuevo Producto</Button>
                      </div>
                      <table className="admin-table">
                          <thead>
                              <tr>
                                  <th>Img</th>
                                  <th>Nombre</th>
                                  <th>Precio</th>
                                  <th>Stock</th>
                                  <th>Acciones</th>
                              </tr>
                          </thead>
                          <tbody>
                              {products.map(p => (
                                  <tr key={p.id}>
                                      <td>
                                          <div style={{width: '40px', height: '40px', overflow: 'hidden', borderRadius: '4px'}}>
                                              <Image src={p.imageUrl} alt="min" />
                                          </div>
                                      </td>
                                      <td>{p.name}</td>
                                      <td>${p.price}</td>
                                      <td>{p.stock}</td>
                                      <td>
                                          <div style={{display: 'flex', gap: '10px'}}>
                                              <button onClick={() => handleEditClick(p)} style={{cursor: 'pointer', color: 'blue', border: 'none', background: 'none', fontWeight: 'bold'}}>Editar</button>
                                              <button onClick={() => handleDeleteClick(p.id)} style={{cursor: 'pointer', color: 'red', border: 'none', background: 'none', fontWeight: 'bold'}}>Borrar</button>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              )}
          </div>
        )}
        
        {/* --- PESTAÑA ÓRDENES --- */}
        {activeTab === 'orders' && (
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Total</th><th>Estado</th><th>Acción</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td><td>${o.total}</td><td>{o.status}</td>
                    <td>
                      <select value={o.status} onChange={(e) => handleStatusChange(o.id, e.target.value)} className="admin-select">
                        <option value="PENDIENTE">PENDIENTE</option><option value="EN_PROCESO">EN_PROCESO</option><option value="FINALIZADO">FINALIZADO</option><option value="CANCELADO">CANCELADO</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        {/* --- PESTAÑA USUARIOS --- */}
        {activeTab === 'users' && (
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th>Email</th><th>Rol</th><th>Acción</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.email}</td><td>{u.role}</td>
                    <td>
                      <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)} className="admin-select">
                        <option value="USER">USER</option><option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

  };
