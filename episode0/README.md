# Episode 0; Setting up your environment
The focus of this episode is on Mac OS X, with a terminal application like [iTerm][iTerm]. We assume
you have basic knowledge of how to enter commands in the terminal.

## Installing what you need
In this episode we are going to assume that you still need to install all the tools and programs
that you need. If you have done something with any of the tools listed chances are that some stuff
is already installed.

What you are going to need is the following:
- HomeBrew
- GIT
- NodeJS
- Yarn

## HomeBrew
[Homebrew][homebrew] is a package manager for Mac OS X. It makes it easier to install software
without having to search for the correct download for your version of the operating system.

All you need to do in order to install Homebrew is entering the following command in your terminal:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

To make sure that the location of Homebrew is in your `$PATH` variable to your `.bash_profile`.

```sh
export PATH="/usr/local/bin:$PATH"
```

To test if Homebrew is installed correctly you can try the following command:
```sh
brew -v
```

Homebrew makes it very easy to install the software you need. If there is a piece of software you
need check with Homebrew if it is available there. For example if you want to know if Postgres is
available on Homebrew you can search for it.

```sh
brew search postgres
```

It will come up with a list and you can install the software using

```sh
brew install <name>
```

## GIT
[GIT][git] is a distributed source control system. That is a mouthful but we use it to keep track of
changes of our code and share them in a team, even though that feels like an understatement. Using
GIT is very much ingrained in our daily lives as software developers.

In order to install it, copy-paste the following command into your terminal:
```sh
brew install git
```

To test if your installation was succesfull you can use
```sh
git --version
```

Optionally, to learn more about the Git way of working you can read the following article
[Git Flow](http://nvie.com/posts/a-successful-git-branching-model/)

## NodeJS
[NodeJS][nodejs] is a Javascript runtime environment that is build upon Chrome's Javascript Engine.
It enables us to build Javascript applications that run in the browser of the user.

```sh
brew install node
```

To check if the node command is available run the following command:

```sh
node -v
```

## Yarn
In our example applications we are going to be using [Yarn][yarn] to manage our dependencies and
packages in a JSON file.

To install simply execute the following command.

```sh
brew install yarn
```

To check your installation, use the following command:

```sh
yarn -v
```

## Versions used at time of writing
Homebrew: 1.5.3
GIT: 2.16.1
NodeJS: 9.5.0
Yarn: 1.3.2

[iTerm]: https://www.iterm2.com/
[homebrew]: https://brew.sh/
[git]: https://git-scm.com/
[nodejs]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/en/
