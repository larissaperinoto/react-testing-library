import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('Verifica se a página contém um titulo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    const title = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se a página contém uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    const image = screen.getByAltText(/Pikachu crying because the page requested was/i);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
