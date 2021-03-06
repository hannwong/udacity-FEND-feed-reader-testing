/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each has a non-empty URL defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each has a non-empty name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is toggled shown/hidden upon menu icon being clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // Loading for only the 1st feed.
            loadFeed(0, function() {
                done();
            })
        });

        it('should load initial entries', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });

        /* TODO: The above should ideally be implemented with a spy
         * rather by re-invoking loadFeed().
         * Do this implementation with spy if reviewer asks me to.
         */
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldFeedHeadings = null;

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            // Load for 1st feed.
            loadFeed(0, function() {
                oldFeedHeadings = $('.feed .entry h2');

                // Then load for 2nd feed.
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('should load a new feed when asked to', function(done) {
            var newFeedHeadings = $('.feed .entry h2');
            for (var i = 0;
                 i < oldFeedHeadings.length && i < newFeedHeadings.length;
                 i++) {
                expect(oldFeedHeadings[i].innerHTML).
                    not.toBe(newFeedHeadings[i].innerHTML);
            }
            done();
        });

        /* TODO: Find out how we can do all that extra loading and reloading
         * without impacting actual website performance.
         * Perhaps deploy an index_test.html such that index.html doesn't have
         * any Jasmine framework attached?
         */
    });
}());
