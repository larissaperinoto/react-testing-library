import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  test('Verifica se é renderizado um card com as informações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');

    const detailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsButton);

    expect(history.location.pathname).toBe('/pokemons/25');

    const pokemonTitle = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(pokemonTitle).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toEqual('Average weight: 6.0 kg');

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const favoriteStar = screen.getByAltText(/is marked as favorite/i);
    expect(favoriteStar).toBeVisible();
    expect(favoriteStar.src).toEqual(expect.stringContaining('star-icon.svg'));
  });
});
