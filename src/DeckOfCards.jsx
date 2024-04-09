import React, { useState, useEffect } from "react";

const BASE_URL = 'https://deckofcardsapi.com/api/deck/';
const NEW_DECK = 'new/shuffle/?deck_count=1';

/** App that gets deck of cards and displays
 *
 * Props: none
 * State:
 * - deck: {data, isLoading}
 * - card: {data}
 *
 * App -> DeckOfCards
 *
*/

function DeckOfCards() {
    const [deck, setDeck] = useState({ data: null, isLoading: true });
    const [card, setCard] = useState(null);
    console.log("cards remaining:", card?.remaining);

    /** Fetches a deck of cards on mount and updates deck state */
    useEffect(function fetchDeckOnMount() {
        async function fetchDeck() {
            const response = await fetch(`${BASE_URL}${NEW_DECK}`);
            const deckResult = await response.json();
            setDeck({data: deckResult, isLoading: false});
        }
        fetchDeck();
    }, []);

    /** Fetches new card and updates state */
    async function fetchCard() {
        if (card?.remaining || card === null) {
            const deckId = deck.data.deck_id;
            const response = await fetch(`${BASE_URL}${deckId}/draw/?count=1`);
            const cardResult = await response.json();
            setCard(cardResult);
        }
    }

    // Shows loading while deck is being fetched
    if (deck.isLoading) return <i>Loading...</i>;

    return (
        <div>
            <button onClick={fetchCard}> Draw a Card </button>
            {(!card?.remaining && card !== null) &&
                <p>Error: no cards remaining</p>}
            <br />
            {card
                ? <img src={card.cards[0].image} alt="A card" />
                : null
            }
        </div>
    );
}

export default DeckOfCards;