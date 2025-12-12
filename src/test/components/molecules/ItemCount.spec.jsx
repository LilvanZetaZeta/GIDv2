import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemCount } from '../../../components/molecules/ItemCount';

describe('Molecule: ItemCount', () => {
  it('incrementa, decrementa y agrega', () => {
    const handleAdd = jasmine.createSpy('onAdd');
    render(<ItemCount stock={5} initial={1} onAdd={handleAdd} />);

    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);
    expect(screen.getByText('2')).toBeTruthy();

    const addBtn = screen.getByText(/agregar/i);
    fireEvent.click(addBtn);
    expect(handleAdd).toHaveBeenCalledWith(2);
  });
});