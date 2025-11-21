import React, { useState, useEffect } from 'react';
import { createProduct } from '../services/productApi';
import { uploadImage } from '../services/imageUploadApi';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { Typography } from '../components/atoms/Typography';
import toast from 'react-hot-toast';
import '../styles/pages/AdminProductPage.css';

// Ahora recibe props para manejar edición y cierre
export const AdminProductPage = ({ productToEdit, onSuccess, onCancel }) => {
    
    // Estado inicial
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    
    // URL de la imagen actual (para cuando editamos y no subimos una nueva)
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    
    const [loading, setLoading] = useState(false);

    // Efecto: Si nos pasan un producto para editar, rellenamos el formulario
    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price);
            setStock(productToEdit.stock);
            setCategory(productToEdit.category);
            setCurrentImageUrl(productToEdit.imageUrl);
        } else {
            // Limpiar si es modo crear
            setName(''); setDescription(''); setPrice(0); setStock(1); setCategory(''); setFile(null); setCurrentImageUrl('');
        }
    }, [productToEdit]);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // --- VALIDACIONES CORREGIDAS ---
        if (price < 0) {
            return toast.error("El precio no puede ser negativo.");
        }
        if (stock < 1) {
            return toast.error("El stock debe ser al menos 1.");
        }
        
        // Si es crear (no hay productToEdit), la imagen es obligatoria.
        // Si es editar, es opcional (podemos mantener la vieja).
        if (!productToEdit && !file) {
            return toast.error("Por favor, selecciona una imagen.");
        }
        // -------------------------------

        setLoading(true);
        
        try {
            let finalImageUrl = currentImageUrl;

            // 1. Si el usuario seleccionó un archivo nuevo, lo subimos
            if (file) {
                const toastId = toast.loading('Subiendo imagen nueva...');
                finalImageUrl = await uploadImage(file);
                toast.dismiss(toastId);
            }

            const productData = { 
                name, 
                description, 
                price: parseFloat(price), 
                stock: parseInt(stock), 
                category, 
                imageUrl: finalImageUrl 
            };
            
            if (productToEdit) {
                // MODO EDICIÓN
                toast.loading('Guardando cambios...');
                await updateProduct(productToEdit.id, productData);
                toast.dismiss();
                toast.success("¡Producto actualizado con éxito!");
            } else {
                // MODO CREACIÓN
                toast.loading('Creando producto...');
                await createProduct(productData);
                toast.dismiss();
                toast.success("¡Producto creado con éxito!");
            }
            
            // Avisamos al padre que terminamos para que recargue la tabla
            if (onSuccess) onSuccess();

        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un error al guardar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Typography variant="h2" className="text-center">
                {productToEdit ? `Editar Producto #${productToEdit.id}` : 'Nuevo Producto'}
            </Typography>
            
            <form onSubmit={handleSubmit} className="admin-page__form">
                <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                
                <label>Precio:</label>
                <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="Precio" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
                
                <label>Stock:</label>
                <Input 
                    type="number" 
                    min="1" 
                    placeholder="Stock" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    required 
                />
                
                <Input placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} required />
                
                <div style={{margin: '1rem 0'}}>
                    <label style={{display:'block', marginBottom:'.5rem'}}>Imagen:</label>
                    {currentImageUrl && !file && (
                        <div style={{marginBottom: '10px', fontSize: '0.9rem', color: 'green'}}>
                            Imagen actual cargada. Sube otra solo si quieres cambiarla.
                        </div>
                    )}
                    <Input type="file" onChange={handleFileChange} required={!productToEdit} />
                </div>
                
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : (productToEdit ? "Guardar Cambios" : "Crear Producto")}
                    </Button>
                    {onCancel && (
                        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
                            Cancelar
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};