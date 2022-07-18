import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testa o componente About', () => {
  test('Verifica se a página contém informações sobre a Pokédex', () => {
    render(<About />);
    const infos = screen.getByText(/This application simulates a Pokédex/i);
    expect(infos).toBeInTheDocument();
  });

  test('Verifica se a página contém um título', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se a página possui dois parágrafos', () => {
    render(<About />);

    const details = screen.getAllByText(/Pokémons/i);
    expect(details.length).toBe(2);
  });

  test('Verifica se a página possui uma imagem', () => {
    render(<About />);

    const image = screen.getByAltText(/Pokédex/i);
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
