# Booking-system

This project was created using Create React App with a typescipt template.

## Get it Running

To run this app, you need to have [Node and NPM](https://nodejs.org/en/) installed on your machine.

This project was written with node version 14.17.6.

Once these are installed, please run the following command using the terminal in the root of the project

```npm install```

Once complete successfully, run the following command in the terminal

```npm run run:server```

This will run the json server on port 4000.
Then open a second terminal (keeping the first open), and enter the following command to run the application:

```npm run start```

You can then run the [application](http://localhost:3000)

## Unit Tests

This application includes unit tests written with jest.
These can be run in the terminal by using the command

```npm run test```

Some tests will be skipped currently due to difficulties in mocking the pathname.

## Design Decisions

To view the designs, open [here](https://github.com/robynred123/tense-breakfast/research)

## The User

I designed this application with the user in mind, I tried to reduce the amount of clicks necessary to complete the flow, and provide them a confirmation and success screen on booking to allow them the option to return and start again. The means the user is not locked into their errors.

Currently it is assumed the user is already logged in to the application, as such there are no fields to add in their personal details.

I also considered the application from the counsellors/therapists point of view. On submitting the request to book, the booking request will be posted to a booking request endpoint, where future features could allow the therapist to log on, and approve requests for their time.

### CSS

I have used Google Material Design for all relevent components, and used a grid layout for responsiveness.
This had the drawback of increasing the bundle size of the application, as design libraries tend to be very robust.
However, it has proved very helpful in quickly adding UI components, and allowing the app to display as intended on all screen sizes.

This is the first proper react app I have worked on since 2019, having been more involved in react-native and backend work since.
As such it completely skipped my mind to use any CSS frameworks when styling the application, and have used in-line styling as I would in react-native with react-native stylesheets.

This could be easily improved by moving the styling into css files, and would reduce the amount of reused code, and improve reliability in layout across different browsers.

### Scalability

I chose to use Redux to store application state, this can be easily scaled for larger applications, though it does also have the drawback of being confusing.
Redux toolkit seems to use Redux Thunk middleware by default, however this could be expanded to use redux-saga or equivalent to extract the logic out of the actions.

This is the first time I've used Redux Toolkit's slice reducers in an application, and I do believe they reduce some of the complexity from previous versions of redux, and improve readability in the reducer.

### Filtering

One of the major elements of functionality in this application is the filtering, to reduce button clicks for the user. As such when clicking on an appointment type button, a specialism checkbox, or filling in a start and end date to filter by, it will automatically filter the results shown on the screen.

One downside to this is that every time it filters, it retrieves the availability data first, as this is a very large data file, this could be improved. However, I am stuck on how this call could be reduced in this situation, other than change the filtering action to be dispatched on the click of a button instead of when the filters are updated. This could also be coupled with the introduction of a 'clear filters' button.

Due to the large size of the availability data, I made the decision to not store it in application state, and instead only retrieve it when needed.

### Unit Test Approach

Unit tests were written in Jest. Previously I have used Enzyme to simulate actions and shallow render components, however the support for enzyme seems to have ended at version 16 of React, and this application was written using version 18. I attempted to find alternatives, but struggled to do so.
As such snapshot testing could be improved.

For other tests, complex functionality was extracted out into util functions to ensure they are well tested in isolation.

### Future Considerations

- More information on the therapist options when filtering could really help the user know that their filters are working.
- The app has been designed with the assumption that the therapists will have photos and bios, currently the bio is a hard coded lorem ipsum.
- Revise filtering logic and improve.
- When the Icon buttons are disabled it's not very obvious, this could be confusing for the user and could be improved.
- Error handling could be improved.

### Known issues

- When Posting data to the json-server, the json file is not updated for some reason. However while it is running, you can browse to <http://localhost:4000/booking-requests.json> to view the posted data while the server is running.
- MUI buttons seem to disappear when clicked, they are visible again when clicking elsewhere.
- The app may have adverse side effects on loading without the server running.
- Confirm and success routes should be nested to prevent being accessed via the url, as they are reliant on navigational state data.
