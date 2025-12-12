import React from 'react';
import { render, screen } from '@testing-library/react';

import { Spinner } from '../../../components/atoms/Spinner';

describe('Atom: Spinner', () => {
  it('debería renderizar correctamente en el documento', () => {
    const { container } = render(<Spinner />);
    
  
    expect(container.firstChild).toBeTruthy();
  });
});