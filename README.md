# Welcome to DraftBuddy.

This is a personal project that is completely free to use. The technologies used to create this web app include Reactjs, ReactQuery, ReactHookForm, Tailwindcss, and HeroIcons.

**Special shoutout to [fantasyfootballcalculator.com](fantasyfootballcalculator.com) for their wonderful API system, providing data needed for this app**.

DraftBuddy is not responsible for any of your draft picks. You and only you are responsible for your season, this app is only used for statistical research purposes. For more terms of usage, please see Terms and Conditions.

Currently this app uses data from year 2021.

---

<br>

## Available Scripts

This app is bootstrapped by CRA [Create React App](https://github.com/facebook/create-react-app).

### `$ git clone <repo>.git; cd <repo>`

To download and get started.

### `$ yarn`

In the project directory, you can run to install dependencies

### `$ yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `$ yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `$ yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `$ yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

---

<br>

## Deployment

### CORS issue

If you run into cors issue when requesting for third party APIs, especially ones whose server don't have cors support; you may need to proxy your request in order to receive data.

I host with [Netlify](https://www.netlify.com/) and their serverless functions can be leveraged to proxy your request via netlify's CDN.

**Files of interest**

1. `/netlify/functions/fantasyfootballcalculator-players/index.js`
2. `/src/hooks/useFetch.js`

---

<br>

## Algorithm

### <ins>Overall draft pick calculation</ins>

1. we must assume that there will be a consistent number of rounds per draft. This assumption is set at 15 (rounds).
2. create base numbered array, each element represents a numbered pick
3. create a reverse base array, to account for snake draft pattern
4. create parent array and push the base and reverse base array into parent array, even numbered elements are reverse arrays
5. create another ODP (overall draft pick) result array, and calculate ODPs: `base rounds (roundNum x headCount) + current pick `
6. after ODP is created and returned, sort through data according to ODP, using finding player's ADP that is closest to the ODP per round
7. see below regarding how players are chosen

### <ins>Draft pick number convergence results</ins>

1. players returned from API (fantasyfootballcalculator) are sorted by their ADP and position

```Javascript
  const qbs = players.filter((el) => el.position === 'QB').sort(adpSort)

  // sort players by ADP value, higher gets pushed.
  function adpSort(a, b)  {
    let comp
    if (a.adp === b.adp) {
      comp = 0
    }
    else if (a.adp < b.adp){
      comp = -1
    }
    else if (b.adp < a.adp) {
      comp = 1
    }

    return comp

  }

```

2. then 3 players are chosen for each position for each round for total of 15 rounds, players are chosen by selecting a player whose ADP is closest to the ODP of that particular round. It will display at min 1 player, and max 3 players

```Javascript

// https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
function closestValue(array, value) {
  let result
  let lastDelta;

  array.some((item) => {
      const delta = Math.abs(value - item.adp)
      if (delta > lastDelta) {
          return true
      }
      result = item
      lastDelta = delta
      return false
  })
  return result
}

```

---

<br>

## TODOS

1. Add in support for browser to store dark/light mode, and to be used subsequently
2. Add in support for kickers and defense? for later rounds
3. Add in support for collegiate candidates coming into the league (may need additional APIs to pull data)
4. Update year supplied during query in `useFetch.js` and `serverless function` once 2022 data is available
5. e2e testing? it will be tough bc of API restrictions :/
