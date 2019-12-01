/// <reference types="Cypress" />
/** eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const urls = {
  staging: "https://business.staging.conio.com",
  production: "https://business.conio.com"
};

const shouldNotBeCached = (xhr: Cypress.Response) =>
  cy
    .wrap(xhr)
    .its("headers")
    .its("cache-control")
    .should("equal", "public,max-age=0,must-revalidate");
const shouldBeCached = (xhr: Cypress.Response) =>
  cy
    .wrap(xhr)
    .its("headers")
    .its("cache-control")
    .should("equal", "public,max-age=31536000,immutable");

const getAppUrl = (pageSource: string) => {
  const regex = /link as="script" rel="preload" href="\/app-([a-z0-9](.*?))\.js"\/>/g;
  return pageSource
    .match(regex)![0]
    .split('href="')[1]
    .replace('"/>', "");
};

context("Site monitoring", () => {
  context("The HTML should not be cached", () => {
    const test = (url: string) => cy.request(url).then(shouldNotBeCached);

    it("staging", () => test(urls.staging));
    it("production", () => test(urls.production));
  });

  context("The sitemap.xml should not be cached", () => {
    const test = (url: string) =>
      cy.request(url + "/sitemap.xml").then(shouldNotBeCached);

    it("staging", () => test(urls.staging));
    it("production", () => test(urls.production));
  });

  context(
    "The Brotli-compressed assets should be served with the correct content encoding",
    () => {
      const test = (url: string) => {
        cy.request(url)
          .its("body")
          .then(getAppUrl)
          .then(appUrl =>
            cy
              .request({
                url: url + appUrl,
                headers: { "Accept-Encoding": "br" }
              })
              .its("headers")
              .its("content-encoding")
              .should("equal", "br")
          );
      };

      it("staging", () => test(urls.staging));
      it("production", () => test(urls.production));
    }
  );

  context("The static assets should be cached", () => {
    const test = (url: string) =>
      cy
        .request(url)
        .its("body")
        .then(getAppUrl)
        .then(appUrl => url + appUrl)
        .then(cy.request)
        .then(shouldBeCached);

    it("staging", () => test(urls.staging));
    it("production", () => test(urls.production));
  });

  context(
    "An internal page should not contain the same content of the 404 page",
    () => {
      const pageNotFoundContent = "Page not found";
      const test = (url: string) => {
        cy.request(`${url}/not-found-page`)
          .its("body")
          .should("contain", pageNotFoundContent);
        cy.request(`${url}/about`)
          .its("body")
          .should("not.contain", pageNotFoundContent);
      };

      it("staging", () => test(urls.staging));
      it("production", () => test(urls.production));
    }
  );

  context(
    "The robots.txt file should disallow the crawling of the staging site and allow the production one",
    () => {
      const test = (url: string, content: string) =>
        cy
          .request(`${url}/robots.txt`)
          .its("body")
          .should("contain", content);

      it("staging", () => test(urls.staging, "Disallow: /"));
      it("production", () => test(urls.production, "Allow: /"));
    }
  );
});
