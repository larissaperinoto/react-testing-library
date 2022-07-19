import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails.js', () => {
  test('Verifica se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(buttonDetails);

    const title = screen.getByRole('heading', { name: /Details/i });
    expect(title).toBeInTheDocument();

    expect(buttonDetails).not.toBeInTheDocument();

    const sumaryTitle = screen.getByRole('heading', { name: /Summary/i });
    expect(sumaryTitle).toBeInTheDocument();

    const infos = screen.getByText(/This intelligent Pokémon roasts /i);
    expect(infos).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(buttonDetails);

    const mapTitle = screen.getByRole('heading', { name: /Game Locations of/i });
    expect(mapTitle).toBeInTheDocument();

    const mapImage = screen.getAllByAltText('Pikachu location');
    expect(mapImage.length).toBe(2);
    expect(mapImage[0].src).toEqual('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImage[1].src).toEqual('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Verifica se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(buttonDetails);

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.type).toBe('checkbox');

    userEvent.click(favoriteButton);
    expect(checkbox.checked).toBe(true);
  });
});
