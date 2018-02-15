# Building a calculator, episode 1

## Setup a JS playground from scratch

We will setup a total blank [GIT][git] repo, with a JS project that can run tests,
and where you can use the latest ES standard.

Execute the following commands in the terminal to setup a minimal work
environment:

```sh
mkdir calculator
cd calculator
git init .
yarn init
# Press enter to use the defaults, or fill in your own details
```

We have created a directory, navigated into it and initiated an empty GIT repository. [Yarn][yarn] is
a package manager and keeps track of all the dependencies you have in your project.

Before we commit we will create a `.gitignore` file, with the following lines inside:

```sh
node_modules/
```

You can now make your first GIT commit.
```sh
git status
git add --all
git commit -m "Initial setup with yarn"
```

## Let's set up our project

```sh
mkdir test
mkdir src

yarn --dev add chai mocha babel-core babel-preset-latest babel-preset-stage-3
```

Here we have created a `test` directory for your tests and a `src` directory for your source code.
The last `yarn` command adds development packages as dependencies. You can find these back in the
`package.json` file.

[Babel][babel] is a Javascript compiler that compiles newer ES to browser-compatible Javascript.
This is necessary because not all browsers support the newer Javascript syntax yet and we do want
our application to work on those as well.

Add the following to the created `package.json`. This is needed to
run the tests. We use [mocha][mocha] to run the tests, and
[chai][chai] to write the test definitions (assertions).

```json
"scripts": {
  "test": "mocha --require babel-core/register"
},
"babel": {
  "presets": [
    "stage-3",
    "latest"
  ]
},
```

You can make sure this all works running `yarn` in the shell.

You can do another GIT commit, so there is always a point to go back to in case something goes
wrong. You can run `yarn test` in the shell and it will display a message that there are no tests to
run, which is correct. So let's add some code.

## Conclusion
We only need to do a tiny bit in order to set up the JS project itself. We don't use any libraries,
like React or Backbone, to get started. Not even jQuery. Just the bare minimum. If we find the need
for a library we can always add it later. No need to make things more complicated than necessary.

[git]: https://git-scm.com/
[yarn]: https://yarnpkg.com/
[babel]: https://babeljs.io/
[chai]: http://chaijs.com/
[mocha]: https://mochajs.org/
