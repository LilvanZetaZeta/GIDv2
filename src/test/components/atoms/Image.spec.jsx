import React from 'react';
import { render, screen } from '@testing-library/react';

import { Image } from '../../../components/atoms/Image';

describe('Atom: Image', () => {
  it('debería renderizar la imagen con src y alt correctos', () => {
    const testSrc = 'https://via.placeholder.com/150';
    const testAlt = 'Imagen de prueba';

    render(<Image src={testSrc} alt={testAlt} />);

    // Buscamos por el rol 'img' (estándar para etiquetas <img>)
    const imgElement = screen.getByRole('img');

    // Verificamos que existe
    expect(imgElement).toBeTruthy();

    // Verificamos sus atributos
    expect(imgElement.getAttribute('src')).toBe(testSrc);
    expect(imgElement.getAttribute('alt')).toBe(testAlt);
  });
});