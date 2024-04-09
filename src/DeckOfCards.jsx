import React, { useState, useEffect } from "react";

const BASE_URL = 'https://deckofcardsapi.com/api/deck/';
const NEW_DECK = 'new/shuffle/?deck_count=1';
// TODO: below variable needs to include deckId
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
/*
{   DECK EXAMPLE
    "success": true,
    "deck_id": "3p40paa87x90",
    "shuffled": true,
    "remaining": 52
}
*/

function DeckOfCards() {
    // need state for deck
    const [deck, setDeck] = useState({ data: null, isLoading: true });
    const [card, setCard] = useState();

    // need to update deck on render with api call
    useEffect(function fetchDeckOnMount() {
        async function fetchDeck() {
            const response = await fetch(`${BASE_URL}${NEW_DECK}`);
            const deckResult = await response.json();
            setDeck(deckResult);
        }
        fetchDeck();
    }, []);

    // function: make api call and update state
    async function fetchCard() {
        const deckId = deck.data.deck_id;
        const response = await fetch(`${BASE_URL}${deckId}/draw/?count=1`);
        const cardResult = await response.json();
        setCard(cardResult);
        // image is cardResult.cards.image
        // how many remaining in deck is remaining
    }

    return (
        <div>
            <button onClick={fetchCard}> Draw a Card </button>
            {card
                ? <img src={card.cards.image} alt="A card" />
                : null
            }
        </div>
    );
    // return statement
}

export default DeckOfCards;