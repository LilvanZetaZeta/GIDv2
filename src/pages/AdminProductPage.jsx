import React, { useState, useEffect } from 'react';
// CORRECCIÓN: Añadido updateProduct a la importación
import { createProduct, updateProduct } from '../services/productApi'; 
import { uploadImage } from '../services/imageUploadApi';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { Typography } from '../components/atoms/Typography';
import toast from 'react-hot-toast';
import '../styles/components/organisms/LoginForm.css'; // Reutilizamos estilos de form

export const AdminProductPage = ({ productToEdit, onSuccess, onCancel }) => {
    // Estado inicial
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    
    // Guardar URL actual por si no se sube nueva imagen al editar
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Efecto: Cargar datos si estamos editando
    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name || '');
            setDescription(productToEdit.description || '');
            setPrice(productToEdit.price || 0);
            setStock(productToEdit.stock || 0);
            setCategory(productToEdit.category || '');
            setCurrentImageUrl(productToEdit.imageUrl || '');
        } else {
            // Limpiar si es crear
            setName(''); setDescription(''); setPrice(0); setStock(1); setCategory(''); setFile(null); setCurrentImageUrl('');
        }
    }, [productToEdit]);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (price < 0) return toast.error("El precio no puede ser negativo.");
        if (stock < 0) return toast.error("El stock no puede ser negativo."); // Stock puede ser 0 si está agotado
        if (!productToEdit && !file) return toast.error("Por favor, selecciona una imagen.");

        setLoading(true);
        const toastId = toast.loading(productToEdit ? 'Actualizando...' : 'Creando...');

        try {
            let finalImageUrl = currentImageUrl;

            // 1. Subir imagen solo si el usuario seleccionó una nueva
            if (file) {
                toast.loading('Subiendo imagen...', { id: toastId });
                finalImageUrl = await uploadImage(file);
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
                // --- MODO EDICIÓN ---
                await updateProduct(productToEdit.id, productData);
                toast.success("¡Producto actualizado!", { id: toastId });
            } else {
                // --- MODO CREACIÓN ---
                await createProduct(productData);
                toast.success("¡Producto creado!", { id: toastId });
            }
            
            // Limpiar y avisar al padre
            if (!productToEdit) {
                setName(''); setDescription(''); setPrice(0); setStock(1); setCategory(''); setFile(null);
                e.target.reset(); 
            }
            if (onSuccess) onSuccess();

        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un error al guardar.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Typography variant="h2" className="text-center">
                {productToEdit ? `Editar Producto #${productToEdit.id}` : 'Nuevo Producto'}
            </Typography>

            <form onSubmit={handleSubmit} className="form">
                <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Nombre</label>
                <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                
                <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Descripción</label>
                <Input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                
                <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Precio</label>
                <Input type="number" step="0.01" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} required />
                
                <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Stock</label>
                <Input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                
                <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Categoría</label>
                <Input placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} required />
                
                <div style={{margin: '1rem 0'}}>
                    <label style={{fontSize: '0.9rem', fontWeight: 'bold', display:'block', marginBottom:'5px'}}>Imagen</label>
                    {currentImageUrl && !file && (
                        <p style={{fontSize: '0.8rem', color: 'green', marginBottom: '5px'}}>Imagen actual cargada. Sube otra para cambiarla.</p>
                    )}
                    <Input type="file" onChange={handleFileChange} required={!productToEdit} />
                </div>
                
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : (productToEdit ? "Guardar Cambios" : "Crear Producto")}
                    </Button>
                    
                    {productToEdit && onCancel && (
                        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
                            Cancelar
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};
