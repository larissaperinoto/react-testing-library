import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Verifica se a página contém um titulo', () => {
    render(<FavoritePokemons />);
    const title = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se há um texto caso não tenha nenhum Pokémon favorito', () => {
    render(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Verifica se há cards com pokemons favoritos', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorite);

    render(<FavoritePokemons />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
