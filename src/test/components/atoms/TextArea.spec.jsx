import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';


import { Textarea } from '../../../components/atoms/TextArea'; 

describe('Atom: Textarea', () => { 
  it('debería renderizar y permitir escribir texto', () => {
    const handleChange = jasmine.createSpy('handleChange');
    
    
    render(<Textarea placeholder="Deja tu mensaje" onChange={handleChange} />);
    
    const textAreaElement = screen.getByPlaceholderText('Deja tu mensaje');
    
    expect(textAreaElement).toBeTruthy();

    fireEvent.change(textAreaElement, { target: { value: 'Prueba de texto' } });
    
    expect(handleChange).toHaveBeenCalled();
  });
});