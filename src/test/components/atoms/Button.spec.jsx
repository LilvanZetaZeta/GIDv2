import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';


import { Button } from '../../../components/atoms/Button'; 

describe('Atom: Button', () => {
  it('renderiza el texto y responde al click', () => {
    const handleClick = jasmine.createSpy('handleClick');
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const btn = screen.getByText('Click Me');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });
});