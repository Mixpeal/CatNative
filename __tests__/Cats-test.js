import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import axios from 'axios';
import Home from '../screens/Home';

const fakeCats = [{
    "id": "abys",
    "name": "Abyssinian",
    "image": {
        "url": "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg"
    }
}, {
    "id": "aege",
    "name": "Aegean",
    "image": {
        "url": "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg"
    }
}, {
    "id": "abob",
    "name": "American Bobtail",
    "image": {
        "url": "https://cdn2.thecatapi.com/images/hBXicehMA.jpg"
    }
}];
describe('Home', () => {
    test('it renders', async () => {
        axios.get.mockResolvedValue({ data: fakeCats });
        const { queryByTestId } = render(<Home />)
        await waitFor(() => queryByTestId('loading-indicator'));
    });

    test('it displays a list of cats', async () => {
        axios.get.mockResolvedValue({ data: fakeCats });

        const { getByTestId } = render(<Home />)
        const catList = await waitFor(() => getByTestId('cat-list'));
        expect(catList).toBeTruthy();
    });

    test('it displays a row for each cat', async () => {
        axios.get.mockResolvedValue({ data: fakeCats });

        const { findAllByTestId } = render(<Home />)
        const catList = await waitFor(() => findAllByTestId('cat-item'));
        expect(catList).toHaveLength(3);
    });
});
