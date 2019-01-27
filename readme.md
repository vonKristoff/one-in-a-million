# amillionads - code test

Microapp built using the Yahoo Weather API. 

This SPA pulls Weather data from the following options: **manual location** entry; **geo location** or can generate a **random latlong** (which may not pull back data due to the latlong dropping deep out at sea). The results display simple details about the location and its respective conditions. The background gradient is generated based on the conditions available, utilsiing variables such as wind direction, temperature and time.

The build is comprised of a client app using `Vue'js`, and a `Express.js` server acting as the API.

## Installation

The app requires no build upon download, however the usual `node-modules` will need to be pulled down from `npm`

```
npm run install // install dependencies
npm start		// start development servers

```

>**TO VIEW TEST**  
_Start the server, and begin by clicking the sun/cog icon..._


### Build notes

* `nodemon` 		: API runs on port `8080`
* `browser-sync` 	: SPA is delivered on port `3000`

CORS is enabled. This app effectively runs from a **development** env, with no **production** deployment endeavoured due to time restrictions. Ideally, I would merge the two and deliver from the same server.

**Tests** I know there are bonus points - but I spent available time on other aspects of the app, and so there aren't any.

---

#### API : entry `api/server.js`
**REST** routes working from `POST` requests.  
Find the OAuth signiture sigining at `api/actions/auth`  
Find the routes at `api/routes/api.js`

#### SPA : entry `js/main.js`
* My build process utilises **NPM Scripts**.
* I am using `Rollup` with `Buble` as a Module bundler and Transpiler respectively.
* For HTML templates and core page view I am using `Jade`.
* As the CSS postprocessor I am using `Stylus`.
* For State management I have integrated `Vuex`.

---

### SPA Structure

Please find the HTML entrypoint at `jade/partials/app` for base structure.

#### Vue Components

_overview_

* `app-navigation` - simply a header to trigger the settings modal
* `app-modal` - the settings modal where the HTTP Request is made
* `app-results` - once the response JSON has been consumed, and pushed into a Vuex Store, this data set will generate the results view

#### Vuex Stores

* `ui` - handles global toggles of the app settings modal, so that it can succinctly controlled by different components.
* `weather` - Where response data is consumed, and sets the availble data (as not all responses are the same from this API) so the relevant views can be driven simply from the Stores getters.

## Test Comments

Please test with Google Chrome - Safari | iOS will not allow geo location on a http connection (needs a https valid server)
By the way IF no data returns on Random - keep clicking away until some random match is made - it does work..!

The following are critiques:

### Design

The design is quite basic, and I added a few transitons to give some UX feedback on interactions. I would have liked to have added some kind of animated dynamic ambience (from data) regarding the weather conditions - such as some particles that reflected the wind speed | direction | chill etc, as the background gradient is supposed to bring about a sense of the temperature (which it does with as much time as I had to tinker with). It's all functional really with not a great deal of creativity in the frontend land. The CSS is not as DRY as it could be, normally I would definitley use variables and more mixins to keep things sweeter. It's so simple it's responsive by nature.  
The Icons used are provided by **[Font-Awesome](https://fontawesome.com/v4.7.0/)**.

### Development

I have no unit tests.  
My build scripts and api boilerplate come from my own stock. I would change a few things build wise / optimisation if I were adding a production process (in terms of wrapping a real deliverable).  
My form input doesn't have any real world validation, but I kept it to a minimum by adding a debounce and min letter requirement. I would have created more components, which would make the app less imparitive, but I'm hoping the code reads clearly enough. The code could be stricter, and I could have alleviated some of the axios request work from the modal component, keeping calls as succinct as possible. The same goes for handling the form response messages, which again should be extracted to a module.  
I also scrambled in a minor ux change last minute to help show validity of location input to relate to the 'submit' button. However adding this feature was a bit hacky!
