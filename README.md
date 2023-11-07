# cli.cometer

CLI that formats your commit message.

## Installation

1. Clone the repo
2. `cd` into it
3. `npm install -g .`

## Usage

1. type `cometer`
```bash
$ cometer
```

2. Type of commit, as a select
```bash
$ - feat
$ - fix
$ - etc...
```

3. Commit message, as an input
```bash
$ I did an awesome job
```

4. commit is created with the following format:
```bash
$ {feat | fix | etc... }: {commit message} [{story id}]
