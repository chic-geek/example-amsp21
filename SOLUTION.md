# Solution

## Approach

- Initially started out by mocking up a quick UI using tailwindCSS to get something that looked relatively useful to use.
- This allowed me to figure out what shape I'd like my the data to be transformed and output ready for the React components.
- I made use of a couple UI libraries to make life easier and quicker, those being [`react-table`](https://react-table.tanstack.com/) and [`tailwindcss`](https://tailwindcss.com/).
- The next important thing was to process the data coming in as per the task assumptions and write a test to make sure what was done worked as intended.
- Go back and begin to write tests for component(s) - This possibly should have happened more, but I ran out of time.

## Thoughts

Given more time:

- Write more tests! Either mock fetch functionaly OR most likely use something like [`MockServiceWorker`](https://mswjs.io/).
- I'd obviously have more tests that make use of the [`user-event`](https://github.com/testing-library/user-event#readme) library to properly test the interactivity of application UI.
- I'd think about pagination and search by user_id functionality for the table in order to help with potential performance issues the table would have with rendering large amounts of data.
- I'd also consider making use of [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to get the processing of large amounts of data off the main JS thread so as not to cripple the user interface.
- Break my working into regular commits, I was far too conscious of spending too much time on the project.
