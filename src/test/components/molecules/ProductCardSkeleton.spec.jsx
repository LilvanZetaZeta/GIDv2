import React from 'react';
import { render } from '@testing-library/react';
import { ProductCardSkeleton } from '../../../components/molecules/ProductCardSkeleton';

describe('Molecule: ProductCardSkeleton', () => {
  it('renderiza sin errores (visual test)', () => {
    const { container } = render(<ProductCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});