import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  test('Verifica se a página contém um titulo', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(textHome).toBeInTheDocument();
  });

  test('Verifica se o próximo Pokémon é exibido ao clicar no botão', () => {
    renderWithRouter(<App />);

    const imagePikachu = screen.getByAltText(/Pikachu sprite/i);
    expect(imagePikachu).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);

    const imageCharmander = screen.getByAltText(/Charmander sprite/i);
    expect(imageCharmander).toBeInTheDocument();
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

  test('Verifica se existem botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(buttons);

    const normalButton = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(normalButton);

    const normalPokemon = screen.getByText(/Snorlax/i);
    const snorlax = screen.getByTestId('pokemon-type');
    expect(normalPokemon).toBeInTheDocument();
    expect(snorlax.textContent).toBe('Normal');

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeDisabled();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeVisible();

    userEvent.click(allButton);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).not.toBeDisabled();
  });
});
