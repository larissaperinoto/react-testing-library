import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('Verifica se existem textos de navegação na tela', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('link', { name: 'Home' });
    const textAbout = screen.getByRole('link', { name: 'About' });
    const textFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(textHome).toBeInTheDocument();
    expect(textAbout).toBeInTheDocument();
    expect(textFavorite).toBeInTheDocument();
  });

  test('Verifica se redireciona para a página inicial ao clicar em "Home"', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(textHome);

    const title = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se redireciona para About ao clicar em "About"', () => {
    renderWithRouter(<App />);

    const textAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(textAbout);

    const title = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se redireciona para Favorites ao clicar em "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const textFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(textFavorite);

    const title = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se Not Found é renderizada em outras URLs', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
