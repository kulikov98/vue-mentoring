// https://docs.cypress.io/api/table-of-contents

describe('Movies app', () => {
  const moviesToLoad = 20;

  before(() => {
    cy.visit('/');
  });

  it('should show logo', () => {
    cy.get('.logo').should('contain.text', 'netflixroulette');
  });

  it('should show h1', () => {
    cy.get('h1').should('have.text', 'Find your movie');
  });

  it('should show movies', () => {
    cy.get('.movie-list').children().should('have.length', moviesToLoad);
  });

  it('should search by title', () => {
    cy.intercept(`https://api.themoviedb.org/3/**`).as('searchMovies');
    cy.get('.search-block input[type="text"]').type('home alone');
    cy.get('.search-block button').click();
    cy.wait('@searchMovies');

    cy.get('.movie-list')
      .children()
      .each((movieCard) => {
        expect(movieCard.text()).to.match(/home.*alone/i);
      });
  });

  it('should search by genre', () => {
    cy.intercept(`https://api.themoviedb.org/3/**`).as('searchMovies');
    cy.get('.movie-search input[value="genre"]').click({ force: true });
    cy.get('.search-block input[type="text"]').clear().type('comedy');
    cy.get('.search-block button').click();

    cy.wait('@searchMovies');

    cy.get('.movie-list')
      .children()
      .each((movieCard) => {
        const genre = movieCard.find('.genre').text();
        expect(genre).to.match(/comedy/i);
      });
  });

  it('should show genre suggestions', () => {
    cy.get('.search-block input[type="text"]').clear().type('f');
    cy.get('.suggestions').children().should('have.length', 2);
    cy.get('.suggestions').children().eq(0).should('have.text', 'Family');
    cy.get('.suggestions').children().eq(1).should('have.text', 'Fantasy');
  });

  it('should show movie info', () => {
    cy.intercept(`https://api.themoviedb.org/3/**`).as('searchMovies');
    cy.get('.search-block input[type="text"]').clear();
    cy.get('.movie-search input[value="title"]').click({ force: true });
    cy.get('.search-block button').click();
    cy.wait('@searchMovies');

    cy.get('.movie-list')
      .children()
      .first()
      .then(($movie) => {
        $movie.click();
        compareMovieData($movie);
      });
  });

  it('should switch movie info', () => {
    cy.get('.movie-list')
      .children()
      .last()
      .then(($movie) => {
        $movie.click();
        compareMovieData($movie);
      });
  });

  it('should exit from movie info to search mode', () => {
    cy.get('header button').click();
    cy.get('h1').should('have.text', 'Find your movie');

  });
});

function compareMovieData($movie) {
  const name = $movie.find('.name').text();
  const year = $movie.find('.year').text();
  const genre = $movie.find('.genre').text();

  cy.get('.movie-description').find('.title').should('have.text', name);
  cy.get('.movie-description').find('.genre').should('have.text', genre);
  cy.get('.movie-description').find('.params').should('contain.text', year);
}
