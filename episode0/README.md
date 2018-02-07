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

To test if Homebrew is installed correctly you can try the following command:
```sh
brew -v
```

## GIT
[GIT][git] is a distributed source control system. That is a mouthful but we use it to keep track of
changes of our code and share them in a team, even though that feels like an understatement. Using
GIT is very much ingrained in our daily lives as software developers.

In order to install it, copy-paste the following command into your terminal:
```sh
brew install git
```

Optionally, to learn more about the Git way of working you can read the following article
[Git Flow](http://nvie.com/posts/a-successful-git-branching-model/)

## NodeJS
TODO

## Yarn
TODO

[iTerm]: https://www.iterm2.com/
[homebrew]: https://brew.sh/
[git]: https://git-scm.com/



