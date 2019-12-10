runnning npm run start:api 
will spin up the apiserver and creates the db.json file under the tools folder as per our instructions in the createMockDb.js file

Now that we have both our api server and the UI react application ready and running, let's modify the scripts in the package.json to have them spun up with a single command using
run-p where p stands for parallel
"start": "run-p start:dev start:api", where we have renamed our earlier start top start:dev that spins up the react application

Now on running npm start on the command line or terminal
we should be able to see this,
npm start

> ps-redux@ start C:\Users\anagaraj\source\repos\DuffAndPhelps\React+Redux\react-redux-react-router-es6\03\demos\before
> run-p start:api start:dev


> ps-redux@ prestart:api C:\Users\anagaraj\source\repos\DuffAndPhelps\React+Redux\react-redux-react-router-es6\03\demos\before
> node tools/createMockDb.js


> ps-redux@ start:dev C:\Users\anagaraj\source\repos\DuffAndPhelps\React+Redux\react-redux-react-router-es6\03\demos\before
> webpack-dev-server --config webpack.config.dev.js --port 3003

Mock DB created

> ps-redux@ start:api C:\Users\anagaraj\source\repos\DuffAndPhelps\React+Redux\react-redux-react-router-es6\03\demos\before
> node tools/apiServer.js

JSON Server is running on port 3001
i ｢wds｣: Project is running at http://localhost:3003/
i ｢wds｣: webpack output is served from /
i ｢wds｣: 404s will fallback to /index.html
i ｢wdm｣:    116 modules
i ｢wdm｣: Compiled successfully.

Implies that both the dev server and the api server are up and running through a single command


Fragmented syntax "<> </>" is used when we have more than one elements in an expression and are of the same level.
In this case we need to wrap the sister level elements into one parent element which would be: <><sister level elements/></>

A <div> can do the same job too, but prefer fragments over divs as divs create unnecessary elements in the DOM making it heavier than required, which can be avoided when using fragments.

Thunk middleware:

Thunk is a function that wraps an expression to delay its evaluation and returns a function in turn.

With Thunk, we don't have to inject or pass in the dispatch or state to the function as arguments as they are implicitly injected by Thunk and are made available.
Therefore we don't have to fork ways for sync and async calls and can have the same plumbing set up for boht the ways.

Consistency
Testing
async


Handling a new slice of state needs adding:
 - an actions file
 - a reducer
 - updating the root reducer, since we added a new reducer to the set of all reducers

Try looking into sagas from thunks

If a component is a managed one and we have no handlers declared then, we wouldn't be able to interact with them like typing inputs in etc.,


1. config files.
package.json
webpack.config.dev.js
babel
format on save in settings to have prettier format our code on every save
common js syntax in a few places because of node's lacking support for es modules 

Transapile: babel
Bundling: webpack
linting: eslint
web server: webpack
Generating html: webpack
loading changes on save: webpack
one command via npm scripts

2. start with the architecture and the basic blokc sof react+redux.
3. REACT, REDUX STORE, ACTIONS, REDUCERS

one immutable store 
actions trigger changesreducers update the state
reducers don't - Mutate arguments, performa side effects like route transistions and api calls, call non-pure functions.
Types of components: container components and presentation components
functional components are 
faster 
easier to Testing
less transpiled code
high SNR
classes may be remove in the future

Thunks are used to handle async calls between actions dispatchers and reducers.
They are middlewares.
Talk about Provider, Connect. Then the entry point to the application which is the index.js file in the 
coursepage.js (it's a class component)
3. then move to the managecourseform.js. It;s a fucntion component with react hooks.
4. 

Finally do go over testing
factory pattern 